import { connectToDatabase } from "@/lib/db";
import { Product as ProductModel } from "@/models/Product";
import { Category as CategoryModel } from "@/models/Category";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Product, Category } from "@/types";

export async function getProducts(options?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "latest" | "price-low" | "price-high" | "best-selling";
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isMadeToOrder?: boolean;
  limit?: number;
}): Promise<Product[]> {
  try {
    const db = await connectToDatabase();
    if (db && ProductModel) {
      const query: Record<string, unknown> = {};
      if (options?.category && options.category !== "all") {
        query.category = options.category;
      }
      if (options?.isFeatured) query.isFeatured = true;
      if (options?.isBestSeller) query.isBestSeller = true;
      if (options?.isMadeToOrder !== undefined) query.isMadeToOrder = options.isMadeToOrder;
      if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
        query.price = {};
        if (options.minPrice !== undefined) (query.price as Record<string, number>).$gte = options.minPrice;
        if (options.maxPrice !== undefined) (query.price as Record<string, number>).$lte = options.maxPrice;
      }
      if (options?.search) {
        query.$or = [
          { title: { $regex: options.search, $options: "i" } },
          { description: { $regex: options.search, $options: "i" } },
          { tags: { $in: [new RegExp(options.search, "i")] } },
        ];
      }

      let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
      if (options?.sort === "price-low") sortOptions = { price: 1 };
      else if (options?.sort === "price-high") sortOptions = { price: -1 };
      else if (options?.sort === "best-selling") sortOptions = { reviewCount: -1 };
      else if (options?.sort === "featured") sortOptions = { isFeatured: -1, createdAt: -1 };

      const products = await ProductModel.find(query)
        .sort(sortOptions)
        .limit(options?.limit || 100)
        .lean();

      if (products && products.length > 0) {
        return JSON.parse(JSON.stringify(products));
      }
    }
  } catch (err) {
    console.warn("Using fallback mock products:", err);
  }

  // Fallback to rich mock data
  let list = [...MOCK_PRODUCTS];

  if (options?.category && options.category !== "all") {
    list = list.filter((p) => p.category === options.category);
  }
  if (options?.isFeatured) {
    list = list.filter((p) => p.isFeatured);
  }
  if (options?.isBestSeller) {
    list = list.filter((p) => p.isBestSeller);
  }
  if (options?.isMadeToOrder !== undefined) {
    list = list.filter((p) => p.isMadeToOrder === options.isMadeToOrder);
  }
  if (options?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (options?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (options?.sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (options?.sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (options?.sort === "best-selling") {
    list.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (options?.sort === "featured") {
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;
  try {
    const db = await connectToDatabase();
    if (db && ProductModel) {
      const decodedSlug = decodeURIComponent(slug);
      const queryOr: any[] = [
        { slug },
        { slug: decodedSlug },
      ];
      if (/^[0-9a-fA-F]{24}$/.test(slug)) {
        queryOr.push({ _id: slug });
      }
      const product = await ProductModel.findOne({ $or: queryOr }).lean();
      if (product) return JSON.parse(JSON.stringify(product));
    }
  } catch (err) {
    console.warn("Using mock product for slug:", slug, err);
  }
  const decodedSlug = decodeURIComponent(slug);
  const item = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || p.slug === decodedSlug || p._id === slug
  );
  return item || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const db = await connectToDatabase();
    if (db && CategoryModel) {
      const cats = await CategoryModel.find().sort({ displayOrder: 1 }).lean();
      if (cats && cats.length > 0) return JSON.parse(JSON.stringify(cats));
    }
  } catch (err) {
    console.warn("Using mock categories:", err);
  }
  return MOCK_CATEGORIES;
}
