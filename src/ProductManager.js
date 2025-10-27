import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path; // Ruta del archivo JSON donde se guardan los productos
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, 'utf-8'); // lee el archivo
    return JSON.parse(data); // Devuelve los productos como array
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id); // Busca producto por ID
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length ? products[products.length - 1].id + 1 : 1; // Genera ID incremental
    const newProduct = { id, ...product };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); // Guarda cambios
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null; // No encontrado

    const updatedProduct = { ...products[index], ...updatedFields, id: products[index].id }; // Mezcla datos
    products[index] = updatedProduct;
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); // Sobrescribe archivo
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false; // No encontrado

    products.splice(index, 1); // Elimina producto
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); // Guarda cambios
    return true;
  }
}

export default ProductManager;