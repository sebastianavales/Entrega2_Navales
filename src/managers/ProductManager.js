import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Obtiene todos los productos del archivo
  async getProducts() {
    try {
      // Si el archivo no existe, se crea vacío
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        return [];
      }
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer los productos:", error);
      return [];
    }
  }

  // Guarda la lista completa de productos
  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  // Busca un producto por su ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  // Agrega un nuevo producto
  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, ...product };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  // Actualiza un producto existente
  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updatedProduct = {
      ...products[index],
      ...updatedFields,
      id: products[index].id,
    };
    products[index] = updatedProduct;
    await this.saveProducts(products);
    return updatedProduct;
  }

  // Elimina un producto por su ID
  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    await this.saveProducts(products);
    return true;
  }
}

export default ProductManager;