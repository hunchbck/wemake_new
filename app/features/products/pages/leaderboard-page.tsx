import { Hero } from "~/common/components/hero";

import type { Route } from "./+types/leaderboard-page";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-20">
      <Hero
        subtitle="The most popular products on wemake"
        title="Leaderboards"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by day.
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`daily-productId-${index}`}
            commentsCount={12}
            description="Product Description"
            id={`productId-${index}`}
            name="Product Name"
            viewsCount={12}
            votesCount={120}
          />
        ))}
        <Button asChild className="text-lg self-center" variant="link">
          <Link to="/products/leaderboards/daily">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by week.
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`weekly-productId-${index}`}
            commentsCount={12}
            description="Product Description"
            id={`productId-${index}`}
            name="Product Name"
            viewsCount={12}
            votesCount={120}
          />
        ))}
        <Button asChild className="text-lg self-center" variant="link">
          <Link to="/products/leaderboards/weekly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by month.
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`monthly-productId-${index}`}
            commentsCount={12}
            description="Product Description"
            id={`productId-${index}`}
            name="Product Name"
            viewsCount={12}
            votesCount={120}
          />
        ))}
        <Button asChild className="text-lg self-center" variant="link">
          <Link to="/products/leaderboards/monthly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by year.
          </p>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={`yearly-productId-${index}`}
            commentsCount={12}
            description="Product Description"
            id={`productId-${index}`}
            name="Product Name"
            viewsCount={12}
            votesCount={120}
          />
        ))}
        <Button asChild className="text-lg self-center" variant="link">
          <Link to="/products/leaderboards/yearly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
