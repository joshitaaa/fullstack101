import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "@/app/_components/navbar";
import { Footer } from "@/app/_components/footer";

export const metadata: Metadata = {
  title: "TeeShop - Quality T-Shirts",
  description: "Shop premium quality t-shirts for every style",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex min-h-screen flex-col bg-gray-50">
        <TRPCReactProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
