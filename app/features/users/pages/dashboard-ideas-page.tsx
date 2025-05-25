import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | wemake" }];
};

export default function DashboardIdeasPage() {
  return (
    <div className="h-full space-y-5">
      <h1 className="mb-6 text-2xl font-semibold">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
          />
        ))}
      </div>
    </div>
  );
}
