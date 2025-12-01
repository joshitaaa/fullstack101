import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">TeeShop</h3>
            <p className="text-sm text-gray-600">
              Quality t-shirts for every style. Comfortable, stylish, and
              affordable.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products" className="hover:text-gray-900">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/basics" className="hover:text-gray-900">
                  Basic Tees
                </Link>
              </li>
              <li>
                <Link href="/category/premium" className="hover:text-gray-900">
                  Premium Collection
                </Link>
              </li>
              <li>
                <Link href="/category/graphic" className="hover:text-gray-900">
                  Graphic Tees
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/sign-in" className="hover:text-gray-900">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-gray-900">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-gray-900">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-gray-900">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <span className="cursor-not-allowed opacity-50">
                  Customer Service
                </span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">Returns</span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">
                  Size Guide
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} TeeShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
