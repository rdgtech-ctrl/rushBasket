// Entry file
import express from "express";
import cors from "cors";


import "dotenv/config";
import { connectDB } from "./config/db.js";

import path from "path";
// Built-in Node.js module
// Helps with file path operations
// Works on any OS (Windows, Mac, Linux)
// ex : path solves this problem
// Windows: uploads\image.jpg  (backslash \)
// Mac/Linux: uploads/image.jpg  (forward slash /)
import { fileURLToPath } from "url";

import userRouter from "./routes/userRoute.js";
import itemrouter from "./routes/productRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
// fileURLToPath() converts a file URL (like file:///home/user/project/app.js) into a standard file path (like /home/user/project/app.js).
// import.meta.url gives you the URL of the current file.
// So together: __filename becomes the absolute path to the current file.
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use() = middleware that runs on every request
// express.urlencoded() = parses form data from request body
// {extended:true} = uses the qs library for parsing (more feature)

connectDB();
// ROUTES
app.use("/api/user", userRouter);

app.use("/uploads", express.static(path.join(__dirname,'uploads')));
app.use('/api/items',itemrouter)
// Makes files in uploads/ folder accessible via HTTP
// when someone requests a file, Express serves it directly
// ex:
// File on disk: uploads/1718349234567-photo.jpg
// URL to access: http://localhost:5000/uploads/1718349234567-photo.jpg

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
