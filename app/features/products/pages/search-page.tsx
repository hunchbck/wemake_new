import { Form } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/search-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid params");
  }
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        subtitle="Search for products by title or description"
        title="Search"
      />
      <Form className="mx-auto flex h-14 max-w-screen-sm items-center justify-center gap-2">
        <Input
          className="text-lg"
          name="query"
          placeholder="Search for products"
        />
        <Button type="submit">Search</Button>
      </Form>
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
