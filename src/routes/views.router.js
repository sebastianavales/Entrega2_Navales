import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("src/data/products.json");

// Vista principal
router.get(["/", "/home"], async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { title: "Home", products });
});

// Vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", {
    title: "Productos en tiempo real",
    products,
  });
});

export default router;