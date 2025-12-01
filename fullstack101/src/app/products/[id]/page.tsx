"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { data: session } = useSession();

  const { data: product, isLoading } = api.product.getById.useQuery({
    id: productId,
  });

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = api.cart.add.useMutation({
    onSuccess: () => {
      alert("Added to cart!");
      router.push("/checkout");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/products" className="mt-4 text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const colors = product.variants
    .filter((v) => v.type === "color")
    .map((v) => v.value);
  const sizes = product.variants
    .filter((v) => v.type === "size")
    .map((v) => v.value);

  const isOnSale =
    product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (!session) {
      alert("Please sign in to add items to your cart");
      router.push("/sign-in");
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size");
      return;
    }

    addToCart.mutate({
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-48 w-48 text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className="mt-4 text-gray-400">Product Image</p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          {isOnSale && (
            <span className="mb-2 inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              ON SALE
            </span>
          )}
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${(product.price / 100).toFixed(2)}
            </span>
            {isOnSale && product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${(product.originalPrice / 100).toFixed(2)}
              </span>
            )}
          </div>
          <p className="mb-6 text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-sm text-green-600">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-600">✗ Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addToCart.isPending}
            className="w-full rounded-md bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </button>

          {/* Category */}
          {product.category && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Category:{" "}
                <Link
                  href={`/category/${product.category}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {product.category}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
