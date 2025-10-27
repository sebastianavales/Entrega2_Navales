import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path; // Ruta del archivo JSON de carritos
  }

  async getCarts() {
    const data = await fs.promises.readFile(this.path, 'utf-8'); // Lee el archivo
    return JSON.parse(data); // Devuelve los carritos como array
  }

  async saveCarts(carts) {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2)); // Guarda el array completo
  }

  async createCart() {
    const carts = await this.getCarts();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1; // Genera ID incremental
    const newCart = { id, products: [] }; // Carrito vacio
    carts.push(newCart);
    await this.saveCarts(carts); // Persiste cambios
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id); // Busca carrito por ID
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null; // Si no existe el carrito

    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity++; // Si existe el producto, aumenta cantidad
    } else {
      cart.products.push({ product: productId, quantity: 1 }); // Si no existe, lo agrega
    }

    await this.saveCarts(carts); // Guarda los cambios en el archivo
    return cart;
  }
}

export default CartManager;