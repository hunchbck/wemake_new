import { IdeaCard } from "~/features/ideas/components/idea-card";
import { getClaimedIdeas } from "~/features/ideas/queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | wemake" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData
}: Route.ComponentProps) {
  return (
    <div className="h-full space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
