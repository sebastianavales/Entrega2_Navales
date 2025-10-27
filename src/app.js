import express from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';

const app = express();
app.use(express.json());

// Instancias de los managers
const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/carts.json');

// Ruta base para probar
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// El servidor escucha en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});


// MANEJO DE PRODUCTOS

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// Obtener un producto por id
app.get('/api/products/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

// Agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// Actualizar un producto por id
app.put('/api/products/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const updatedFields = req.body;
  const updatedProduct = await productManager.updateProduct(id, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(updatedProduct);
});

// Eliminar un producto por id
app.delete('/api/products/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const deleted = await productManager.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({ message: 'Producto eliminado correctamente' });
});

// MANEJO DE CARRITOS

// Crear un nuevo carrito
app.post('/api/carts', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Obtener un carrito por ID
app.get('/api/carts/:cid', async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(id);
  cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
});

// Agregar un producto a un carrito
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = await cartManager.addProductToCart(cartId, productId);

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(cart);
});