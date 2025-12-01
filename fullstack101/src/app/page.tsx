import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  void api.product.getAll.prefetch({ limit: 6 });

  return (
    <HydrateClient>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Premium Quality T-Shirts
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Discover our collection of comfortable, stylish t-shirts made from
            the finest materials. Perfect for any occasion.
          </p>
        </div>

        {/* Featured Products */}
        <ProductGrid />
      </div>
    </HydrateClient>
  );
}

async function ProductGrid() {
  const products = await api.product.getAll({ limit: 6 });

  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="mx-auto h-24 w-24 text-gray-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">T-Shirt Image</p>
                  </div>
                </div>
                {isOnSale && (
                  <div className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    SALE
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {isOnSale && product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
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

      {/* View All Link */}
      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="inline-block rounded-md bg-gray-900 px-8 py-3 text-white transition-colors hover:bg-gray-800"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
