"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { api } from "@/trpc/react";

export function Navbar() {
  const { data: session } = useSession();
  const { data: cartData } = api.cart.get.useQuery(undefined, {
    enabled: !!session,
  });

  const cartItemCount =
    cartData?.cartItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">TeeShop</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              All Products
            </Link>
            <Link
              href="/category/basics"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Basics
            </Link>
            <Link
              href="/category/premium"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Premium
            </Link>
            <Link
              href="/category/graphic"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Graphic
            </Link>
          </div>

          {/* Right Side - Cart & Auth */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/checkout"
                  className="relative text-gray-700 transition-colors hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/orders"
                  className="text-gray-700 transition-colors hover:text-gray-900"
                >
                  Orders
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    {session.user.name}
                  </span>
                  <Link
                    href="/api/auth/sign-out"
                    className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    Sign Out
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
