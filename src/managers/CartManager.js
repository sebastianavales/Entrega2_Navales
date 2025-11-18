import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  // Obtiene todos los carritos del archivo
  async getCarts() {
    try {
      // Si el archivo no existe, se crea vacío
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        return [];
      }
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer los carritos:", error);
      return [];
    }
  }

  // Guarda la lista completa de carritos
  async saveCarts(carts) {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // Crea un nuevo carrito vacío
  async createCart() {
    const carts = await this.getCarts();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id, products: [] };
    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  // Busca un carrito por su ID
  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((c) => c.id === id);
  }

  // Agrega un producto a un carrito
  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (p) => p.product === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity++; // Si ya existe, aumenta cantidad
    } else {
      cart.products.push({ product: productId, quantity: 1 }); // Si no existe, lo agrega
    }

    await this.saveCarts(carts);
    return cart;
  }
}

export default CartManager;