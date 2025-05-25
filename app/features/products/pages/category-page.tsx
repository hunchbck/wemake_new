import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/category-page";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | ProductHunt Clone` },
    { name: "description", content: `Browse Developer Tools products` },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero
        subtitle={`Tools for developers to build products faster`}
        title={"Developer Tools"}
      />

      <div className="mx-auto w-full max-w-screen-md space-y-5">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            commentsCount={12}
            description="Product Description"
            id={`productId-${index}`}
            name="Product Name"
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
