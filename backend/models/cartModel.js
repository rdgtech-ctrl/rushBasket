import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // References a User document's ID
      ref: "User",
      // Links to the "User" model
      required: true,
      // Every cart item MUST have a user
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      // References a Product document's ID
      ref: "Product",
      // Links to the "Product" model
      required: true,
      // Every cart item MUST have a product
    },
    quantity: {
      type: Number,
      // Quantity is a number
      default: 1,
      // If not provided, defaults to 1
      min: 1,
      // Cannot be less than 1 (can't have negative items)
    },
  },
  {
    timestamps: true,
  },
);
export const CartItem = mongoose.model("CartItem", cartItemSchema);
// Creates and exports the CartItem model
// 'CartItem' = model name
// cartItemSchema = the schema blueprint
// Now you can use: CartItem.create(), CartItem.find(), etc
