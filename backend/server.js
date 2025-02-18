// // import dotenv from 'dotenv';
// // dotenv.config({ path: './.env' });

// import express from "express";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";
// import cors from "cors";
// import path from "path";


// // console.log("MONGO_URI:", process.env.MONGO_URI);  // Check if this outputs the correct URI
// // console.log("Environment Variables Loaded:", process.env);

// const app = express();
// // Start the server
// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

// mongoose.connect("mongodb+srv://chetanaa2629:K29U6JcYuNnCAhzg@cluster0.cwruy.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0", { ... });


// // connectDB()
// //   .then(() => console.log(" MongoDB Connected"))
// //   .catch((err) => console.error(" MongoDB Connection Error:", err.message));

// app.use(express.json()); 
// app.use(cors({ origin: "http://localhost:5173" })); 
// app.use("/api/products", productRoutes); 

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
//     console.log(` Server is running on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";

// Removed dotenv configuration as you are directly using the Mongo URI
const app = express();
// Start the server
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Correct mongoose connection with options
mongoose.connect("mongodb+srv://chetanaa2629:K29U6JcYuNnCAhzg@cluster0.cwruy.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err.message));

app.use(express.json()); 
app.use(cors({ origin: "http://localhost:5173" })); 
app.use("/api/products", productRoutes); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
