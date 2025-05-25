import { Hero } from "~/common/components/hero";
import { CategoryCard } from "../components/category-card";
import type { Route } from "./+types/categories-page";

export const meta: Route.MetaFunction = () => [
  { title: "Categories | ProductHunt Clone" },
  { name: "description", content: "Browse products by category" },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero subtitle="Browse products by category" title="Categories" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`categoryId-${index}`}
            description="Category Description"
            id={`categoryId-${index}`}
            name="Category Name"
          />
        ))}
      </div>
    </div>
  );
}
