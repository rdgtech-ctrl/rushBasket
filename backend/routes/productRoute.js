import express from "express"; // Web framework for routing
import multer from "multer"; // Middleware for handling file uploads
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";


const itemrouter = express.Router();
// Creates a new Express router to define routes for products.

// MULTER SETUP
// multer.diskStorage() - Store files on disk (not in memory)
// Stores uploaded files on the server's hard drive
// Files don't stay in memory (saves RAM)
// Each file gets unique name (prevents overwriting)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  // destination - Saves files to uploads/ folder
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  //Renames file to: timestamp-originalname
  // Example: 1718349234567-photo.jpg
});

// creates a multer middleware that uses the storage configuration above.
const upload = multer({ storage });

// ROUTES
itemrouter.get("/", getProducts);
// HTTP Method: GET
// Endpoint: / (or /api/items when router is mounted)
// Handler: getProducts function from controller
// What it does: Returns all products from database
itemrouter.post("/", upload.single("image"), createProduct);
itemrouter.delete("/:id", deleteProduct);

export default itemrouter;
