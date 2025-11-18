import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import path from "path";
import { fileURLToPath } from "url";

// Instancia del router de Express
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsFile = path.join(__dirname, "..", "data", "carts.json");

const cartManager = new CartManager(cartsFile);

// POST /api/carts
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(id);
  cart
    ? res.json(cart)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

// POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = await cartManager.addProductToCart(cartId, productId);
  cart
    ? res.json(cart)
    : res.status(404).json({ error: "Carrito no encontrado" });
});

export default router;