// import { render } from "@react-email/components";
import { WelcomeUser } from "react-email-starter/emails/welcome-user";
import { Resend } from "resend";
import type { Route } from "./+types/welcome-page";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
  // const emailHtml = await render(<WelcomeUser username={params.username} />);
  const { data, error } = await client.emails.send({
    from: "Hyun <hyun@onepy.kr>",
    to: "hunchbck@nate.com",
    subject: "한평 회원가입 축하드립니다.",
    react: <WelcomeUser username={params.username} />
  });
  return Response.json({ data, error });
};
