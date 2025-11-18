import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import path from "path";
import { fileURLToPath } from "url";

// Instancia del router de Express
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFile = path.join(__dirname, "..", "data", "products.json");

const productManager = new ProductManager(productsFile);

// GET /api/products
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  product
    ? res.json(product)
    : res.status(404).json({ error: "Producto no encontrado" });
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);

    // Emitir update usando io desde app
    const io = req.app.get("io");
    if (io) {
      const products = await productManager.getProducts();
      io.emit("updateProducts", products);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const updatedProduct = await productManager.updateProduct(id, req.body);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  // 🔹 Emitir actualización en tiempo real
  const io = req.app.get("io");
  if (io) {
    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  }

  res.json(updatedProduct);
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const deleted = await productManager.deleteProduct(id);
  if (!deleted)
    return res.status(404).json({ error: "Producto no encontrado" });

  // Emitir update
  const io = req.app.get("io");
  if (io) {
    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  }

  res.json({ message: "Producto eliminado correctamente" });
});

export default router;