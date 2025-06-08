import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Form, redirect } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { claimIdea } from "../mutations";
import { getGptIdea } from "../queries";
import type { Route } from "./+types/idea-page";

export const meta = ({ data }: Route.MetaArgs) => {
  if (!data || !data.idea) {
    return [
      { title: "Idea | wemake" },
      { name: "description", content: "Find ideas for your next project" }
    ];
  }
  const { gpt_idea_id, idea } = data.idea;
  return [
    { title: `Idea #${gpt_idea_id}: ${idea} | wemake` },
    { name: "description", content: "Find ideas for your next project" }
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return { idea };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });
  if (idea.is_claimed) {
    return { ok: false };
  }
  await claimIdea(client, { ideaId: params.ideaId, userId });
  return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
      <div className="mx-auto flex max-w-screen-sm flex-col items-center gap-10">
        <p className="text-center italic">"{loaderData.idea.idea}"</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="h-4 w-4" />
          <span>
            {DateTime.fromISO(loaderData.idea.created_at).toRelative()}
          </span>
          <DotIcon className="h-4 w-4" />
          <Button variant="outline">
            <HeartIcon className="h-4 w-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        {loaderData.idea.is_claimed ? null : (
          <Form method="post">
            <Button size="lg">Claim idea</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
