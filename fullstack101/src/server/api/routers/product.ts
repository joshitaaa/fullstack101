import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          limit: z.number().min(1).max(100).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const products = await db.product.findMany({
        where: {
          isActive: true,
          ...(input?.category ? { category: input.category } : {}),
        },
        include: {
          variants: true,
        },
        orderBy: { createdAt: "desc" },
        take: input?.limit ?? 100,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        variants: product.variants,
      }));
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await db.product.findUnique({
        where: { id: input.id, isActive: true },
        include: {
          variants: true,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        variants: product.variants,
      };
    }),

  getCategories: publicProcedure.query(async () => {
    const products = await db.product.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ["category"],
    });

    return products
      .map((p) => p.category)
      .filter((c): c is string => c !== null);
  }),
});
