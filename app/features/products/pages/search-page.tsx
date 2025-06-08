import { Form } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { makeSSRClient } from "~/supa-client";
import { ProductCard } from "../components/product-card";
import { getPagesBySearch, getProductsBySearch } from "../queries";
import type { Route } from "./+types/search-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" }
  ];
};

const searchParams = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1)
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParams.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid params");
  }
  if (parsedData.query === "") {
    return { products: [], totalPages: 1 };
  }
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsBySearch(client, {
    query: parsedData.query,
    page: parsedData.page
  });
  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query
  });
  return { products, totalPages };
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
        {loaderData.products.map((product) => (
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
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
