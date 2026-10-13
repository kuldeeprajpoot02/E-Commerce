
import Product from "../models/productModel.js";

// Get all products from MongoDB
export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};