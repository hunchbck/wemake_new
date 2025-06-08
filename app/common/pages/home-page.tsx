import { DateTime } from "luxon";
import { Link, type MetaFunction } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import { getPosts } from "~/features/community/queries";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { getGptIdeas } from "~/features/ideas/queries";
import { JobCard } from "~/features/jobs/components/job-card";
import { getJobs } from "~/features/jobs/queries";
import { ProductCard } from "~/features/products/components/product-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { TeamCard } from "~/features/teams/components/team-card";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";
import { Button } from "../components/ui/button";
import type { Route } from "./+types/home-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" }
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7
  });
  const posts = await getPosts(client, {
    limit: 7,
    sorting: "newest"
  });
  const ideas = await getGptIdeas(client, { limit: 7 });
  const jobs = await getJobs(client, { limit: 11 });
  const teams = await getTeams(client, { limit: 7 });
  return { products, posts, ideas, jobs, teams };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Today's Products
          </h2>
          <p className="text-foreground text-xl font-light">
            The best products made by our community today.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-foreground text-xl font-light">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            authorAvatarUrl={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-foreground text-xl font-light">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewsCount={idea.views}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-foreground text-xl font-light">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            id={job.job_id}
            company={job.company_name}
            companyLogoUrl={job.company_logo}
            companyHq={job.company_location}
            title={job.position}
            postedAt={job.created_at}
            type={job.job_type}
            positionLocation={job.location}
            salary={job.salary_range}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Find a team mate
          </h2>
          <p className="text-foreground text-xl font-light">
            Join a team looking for a new member.
          </p>
          <Button variant="link" asChild className="p-0 text-lg">
            <Link prefetch="viewport" to="/teams">
              Explore all teams &rarr;
            </Link>
          </Button>
        </div>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(",")}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
