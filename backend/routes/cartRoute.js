import express from "express";
import authMiddleware from "../middleware/auth";
import {
  addToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controllers/cartController";

const cartRouter = express.Router();
cartRouter.use(authMiddleware);

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.put("/:id",updateCartItem);
cartRouter.delete('/:id',deleteCartItem)
cartRouter.post('/clear',clearCart())

export default cartRouter;