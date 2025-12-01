import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  void api.product.getAll.prefetch({ category: slug });

  return (
    <HydrateClient>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CategoryContent category={slug} />
      </div>
    </HydrateClient>
  );
}

interface CategoryContentProps {
  category: string;
}

async function CategoryContent({ category }: CategoryContentProps) {
  const products = await api.product.getAll({ category });

  const categoryNames: Record<string, string> = {
    basics: "Basic T-Shirts",
    premium: "Premium Collection",
    graphic: "Graphic Tees",
  };

  const categoryTitle = categoryNames[category] ?? category;

  return (
    <>
      <div className="mb-8">
        <nav className="mb-4 flex text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{categoryTitle}</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900">{categoryTitle}</h1>
        <p className="mt-2 text-gray-600">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-600">No products found in this category.</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            View all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const isOnSale =
              product.originalPrice && product.originalPrice > product.price;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                {/* Product Image Placeholder */}
                <div className="relative aspect-square bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-20 w-20 text-gray-300"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                      <p className="mt-2 text-xs text-gray-400">T-Shirt</p>
                    </div>
                  </div>
                  {isOnSale && (
                    <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      {isOnSale && product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${(product.originalPrice / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.stock > 0 ? (
                      <span className="text-xs text-green-600">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
