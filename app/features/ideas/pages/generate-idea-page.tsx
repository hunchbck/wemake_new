import OpenAI from "openai";
import { z } from "zod";
import { adminClient } from "~/supa-client";
import { insertIdeas } from "../mutations";
import type { Route } from "./+types/generate-idea-page";

const openai = new OpenAI();

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: "A short description of the idea. 100 characters max."
  }),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "tech",
    "business",
    "health",
    "education",
    "finance",
    "other"
  ])
});

const ResponseSchema = z.object({
  potato: z.array(IdeaSchema)
});

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-POTATO");
  if (!header || header !== "X-TOMATO") {
    return new Response(null, { status: 404 });
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `
소규모 팀이 만들 수 있는 스타트업 아이디어의 이름과 엘리베이터 피치를 한글로 알려줘.
아래와 같은 JSON 형식으로만 답변해줘.

{
  "potato": [
    {
      "title": "아이디어 제목",
      "description": "100자 이내 설명",
      "problem": "문제 설명",
      "solution": "해결책 설명",
      "category": "tech | business | health | education | finance | other"
    }
    // ... 총 10개
  ]
}
예시 외의 말은 절대 하지 마!
코드블록 없이 JSON만 반환해줘.
`
      },
      {
        role: "user",
        content:
          "예시: '식료품 최저가를 찾아주는 앱', 또는 '시간 단위로 개발자를 대여할 수 있는 플랫폼' 등."
      },
      { role: "user", content: "10가지 아이디어를 알려줘." }
    ]
  });
  let content = completion.choices[0].message.content ?? "";

  // 코드블록 제거
  content = content.trim();
  if (content.startsWith("```json")) {
    content = content
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
  } else if (content.startsWith("```")) {
    content = content.replace(/^```/, "").replace(/```$/, "").trim();
  }
  console.log(content);
  const parsed = ResponseSchema.safeParse(JSON.parse(content ?? "{}"));
  if (!parsed.success) {
    return Response.json(
      {
        error: "No valid ideas generated"
      },
      { status: 400 }
    );
  }
  const descriptions = parsed.data.potato.map((idea) => idea.description);
  await insertIdeas(adminClient, descriptions);
  return Response.json({
    ok: true
  });
};

export const loader = async () => {
  return null;
};
