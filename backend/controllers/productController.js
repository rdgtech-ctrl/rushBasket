import { Product } from "../models/productModel.js";
// ../controllers/productController.js
import fs from "fs";
import path from "path";

// GET FUNCTION TO FETCH PRODUCTS
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      products
    });
  } catch (err) {
    next(err);
  }
};

// CREATE A PRODUCT
export const createProduct = async (req, res, next) => {
  try {
    // FIX 1: Correct syntax for accessing filename
    const filename = req.file?.filename ?? null;
    const imageUrl = filename ? `/uploads/${filename}` : null;
    
    const { name, description, category, oldPrice, price } = req.body;

    // FIX 2: Validate required fields
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, description, category, price) are required"
      });
    }

    // FIX 3: Validate price values
    if (isNaN(price) || (oldPrice && isNaN(oldPrice))) {
      return res.status(400).json({
        success: false,
        message: "Price and oldPrice must be numbers"
      });
    }

    if (Number(price) < 0 || (oldPrice && Number(oldPrice) < 0)) {
      return res.status(400).json({
        success: false,
        message: "Prices cannot be negative"
      });
    }

    const product = await Product.create({
      name,
      description,
      category,
      oldPrice: oldPrice ? Number(oldPrice) : 0,
      price: Number(price),
      imageUrl
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (err) {
    // FIX 4: Clean up uploaded file if product creation fails
    if (req.file?.filename) {
      const filepath = path.join("uploads", req.file.filename);
      fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
      });
    }
    next(err);
  }
};

// UPDATE A PRODUCT
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category, oldPrice, price } = req.body;

    // Validate input
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate prices
    if (isNaN(price) || (oldPrice && isNaN(oldPrice))) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number"
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Handle image replacement
    let imageUrl = product.imageUrl;
    if (req.file?.filename) {
      // Delete old image if exists
      if (product.imageUrl) {
        const oldImageName = product.imageUrl.split("/").pop();
        const oldImagePath = path.join("uploads", oldImageName);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        oldPrice: oldPrice ? Number(oldPrice) : 0,
        price: Number(price),
        imageUrl
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (err) {
    // Clean up uploaded file if update fails
    if (req.file?.filename) {
      const filepath = path.join("uploads", req.file.filename);
      fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
      });
    }
    next(err);
  }
};

// DELETE A PRODUCT BY ID
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findByIdAndDelete(id);

    // FIX 5: Proper error response
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // FIX 6: Delete associated image file
    if (product.imageUrl) {
      const imageName = product.imageUrl.split("/").pop();
      const imagePath = path.join("uploads", imageName);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: product
    });
  } catch (err) {
    next(err);
  }
};