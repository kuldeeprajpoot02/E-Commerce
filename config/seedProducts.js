
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Product from "../models/productModel.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Comfortable headphones for everyday use.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
    quantity: 20,
  },
  {
    name: "Smart Watch",
    description: "A stylish watch for daily activities.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Electronics",
    quantity: 15,
  },
  {
    name: "Running Shoes",
    description: "Comfortable shoes for everyday wear.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "Fashion",
    quantity: 12,
  },
  {
    name: "Backpack",
    description: "A practical backpack for work and travel.",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Fashion",
    quantity: 25,
  },
  {
    name: "Coffee Maker",
    description: "Prepare your favorite coffee at home.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    category: "Home",
    quantity: 10,
  },
  {
    name: "Sunglasses",
    description: "Classic sunglasses for everyday use.",
    price: 799,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    category: "Fashion",
    quantity: 30,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Insert only if this collection is empty.
    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Seed cancelled: collection already has ${existingCount} products.`
      );
      return;
    }

    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();