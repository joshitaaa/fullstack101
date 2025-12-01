import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  console.log("Clearing existing product data...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  // Create T-shirt products
  console.log("Creating T-shirt products...");

  const product1 = await prisma.product.create({
    data: {
      id: "tshirt-1",
      name: "Classic Cotton Tee",
      description:
        "Soft, breathable 100% cotton t-shirt. Perfect for everyday wear with a comfortable fit.",
      price: 2499, // $24.99
      originalPrice: 2999, // $29.99
      imageUrl: "/tshirt-placeholder.jpg",
      category: "basics",
      stock: 200,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "White", stock: 50 },
          { type: "color", value: "Black", stock: 50 },
          { type: "color", value: "Navy", stock: 50 },
          { type: "color", value: "Gray", stock: 50 },
          { type: "size", value: "S", stock: 40 },
          { type: "size", value: "M", stock: 60 },
          { type: "size", value: "L", stock: 60 },
          { type: "size", value: "XL", stock: 40 },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      id: "tshirt-2",
      name: "Premium V-Neck Tee",
      description:
        "Elegant v-neck design in premium cotton blend. Stylish and comfortable for any occasion.",
      price: 2999, // $29.99
      originalPrice: null,
      imageUrl: "/tshirt-placeholder.jpg",
      category: "premium",
      stock: 150,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "White", stock: 40 },
          { type: "color", value: "Black", stock: 40 },
          { type: "color", value: "Charcoal", stock: 35 },
          { type: "color", value: "Burgundy", stock: 35 },
          { type: "size", value: "S", stock: 30 },
          { type: "size", value: "M", stock: 50 },
          { type: "size", value: "L", stock: 50 },
          { type: "size", value: "XL", stock: 20 },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      id: "tshirt-3",
      name: "Graphic Print Tee",
      description:
        "Bold graphic design on quality cotton. Express yourself with unique artwork.",
      price: 2799, // $27.99
      originalPrice: 3499, // $34.99
      imageUrl: "/tshirt-placeholder.jpg",
      category: "graphic",
      stock: 180,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "White", stock: 45 },
          { type: "color", value: "Black", stock: 50 },
          { type: "color", value: "Navy", stock: 45 },
          { type: "color", value: "Forest Green", stock: 40 },
          { type: "size", value: "S", stock: 35 },
          { type: "size", value: "M", stock: 55 },
          { type: "size", value: "L", stock: 55 },
          { type: "size", value: "XL", stock: 35 },
        ],
      },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      id: "tshirt-4",
      name: "Long Sleeve Tee",
      description:
        "Classic long sleeve design. Perfect for layering or wearing alone in cooler weather.",
      price: 3299, // $32.99
      originalPrice: null,
      imageUrl: "/tshirt-placeholder.jpg",
      category: "basics",
      stock: 120,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "White", stock: 30 },
          { type: "color", value: "Black", stock: 35 },
          { type: "color", value: "Gray", stock: 30 },
          { type: "color", value: "Olive", stock: 25 },
          { type: "size", value: "S", stock: 25 },
          { type: "size", value: "M", stock: 40 },
          { type: "size", value: "L", stock: 40 },
          { type: "size", value: "XL", stock: 15 },
        ],
      },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      id: "tshirt-5",
      name: "Organic Cotton Tee",
      description:
        "Eco-friendly organic cotton t-shirt. Sustainable fashion that feels great.",
      price: 3499, // $34.99
      originalPrice: null,
      imageUrl: "/tshirt-placeholder.jpg",
      category: "premium",
      stock: 100,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "Natural", stock: 30 },
          { type: "color", value: "Stone", stock: 25 },
          { type: "color", value: "Sage", stock: 25 },
          { type: "color", value: "Earth", stock: 20 },
          { type: "size", value: "S", stock: 20 },
          { type: "size", value: "M", stock: 35 },
          { type: "size", value: "L", stock: 30 },
          { type: "size", value: "XL", stock: 15 },
        ],
      },
    },
  });

  const product6 = await prisma.product.create({
    data: {
      id: "tshirt-6",
      name: "Stripe Pattern Tee",
      description:
        "Classic stripe pattern in multiple color combinations. Timeless style that never goes out of fashion.",
      price: 2899, // $28.99
      originalPrice: 3299, // $32.99
      imageUrl: "/tshirt-placeholder.jpg",
      category: "graphic",
      stock: 160,
      isActive: true,
      variants: {
        create: [
          { type: "color", value: "Navy/White", stock: 40 },
          { type: "color", value: "Black/Gray", stock: 45 },
          { type: "color", value: "Red/White", stock: 40 },
          { type: "color", value: "Green/White", stock: 35 },
          { type: "size", value: "S", stock: 30 },
          { type: "size", value: "M", stock: 50 },
          { type: "size", value: "L", stock: 50 },
          { type: "size", value: "XL", stock: 30 },
        ],
      },
    },
  });

  console.log("Created products:", {
    product1: product1.name,
    product2: product2.name,
    product3: product3.name,
    product4: product4.name,
    product5: product5.name,
    product6: product6.name,
  });
  console.log("Seeding finished successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
