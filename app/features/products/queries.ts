import type { SupabaseClient } from "@supabase/supabase-js";
import type { DateTime } from "luxon";
import type { Database } from "~/supa-client";
import { PAGE_SIZE } from "./constants";
export const productListSelect = `
product_id,
name,
tagline,
upvotes:stats->>upvotes,
views:stats->>views,
reviews:stats->>reviews
`;

export const getProductsByDateRange = async (
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
    search,
    limit = 40,
    page = 1
  }: {
    startDate: DateTime;
    endDate: DateTime;
    search?: string;
    limit?: number;
    page?: number;
  }
) => {
  const query = client
    .from("products")
    .select(productListSelect)
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (search) {
    query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
  }
  const { data, error } = await query.range(
    (page - 1) * limit,
    page * limit - 1
  );
  if (error) throw error;
  return data;
};

export const getProductPagesByDateRange = async (
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
    search
  }: {
    startDate: DateTime;
    endDate: DateTime;
    search?: string;
  }
) => {
  const query = client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (search) {
    query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
  }
  const { count, error } = await query;

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description");
  if (error) throw error;
  return data;
};

export const getCategory = async (
  client: SupabaseClient<Database>,
  categoryId: number
) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async (
  client: SupabaseClient<Database>,
  {
    categoryId,
    search,
    limit = 40,
    page = 1
  }: {
    categoryId: number;
    search?: string;
    limit?: number;
    page?: number;
  }
) => {
  const query = client
    .from("products")
    .select(productListSelect)
    .eq("category_id", categoryId);
  if (search) {
    query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
  }
  const { data, error } = await query
    .order("stats->>upvotes", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (error) throw error;
  return data;
};
export const getProductPagesByCategory = async (
  client: SupabaseClient<Database>,
  {
    categoryId,
    search,
    limit = 40
  }: {
    categoryId: number;
    search?: string;
    limit?: number;
  }
) => {
  const query = client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (search) {
    query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
  }
  const { count, error } = await query;

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / limit);
};

export const getProductPagesBySearch = async (
  client: SupabaseClient<Database>,
  {
    search,
    limit = 40
  }: {
    search: string;
    limit?: number;
  }
) => {
  const query = client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);

  const { count, error } = await query;

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / limit);
};

export const getProductBySearch = async (
  client: SupabaseClient<Database>,
  {
    search,
    limit = 40,
    page = 1
  }: {
    search: string;
    limit?: number;
    page?: number;
  }
) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .or(`name.ilike.%${search}%,tagline.ilike.%${search}%`)
    .order("stats->>upvotes", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return data;
};

export const getProductById = async (
  client: SupabaseClient<Database>,
  productId: string
) => {
  const { data, error } = await client
    .from("product_overview_view")
    .select("*")
    .eq("product_id", Number(productId))
    .single();

  if (error) throw error;
  return data;
};

export const getReviews = async (
  client: SupabaseClient<Database>,
  productId: string
) => {
  const { data, error } = await client
    .from("reviews")
    .select(
      `
      review_id,
      rating,
      review,
      created_at,
      user:profiles!inner(
        profile_id,
        name,
        username,
        avatar
    )
    `
    )
    .eq("product_id", Number(productId));
  if (error) throw error;
  return data;
};
