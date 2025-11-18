// Importación de dependencias
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Importación de rutas y lógica
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

// Configuración de rutas del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración básica del servidor
const app = express();
const PORT = 8080;
const productManager = new ProductManager("./src/data/products.json");

// Middlewares
app.use(express.json()); // Permite recibir JSON en el body
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios
app.use(express.static(path.join(__dirname, "public"))); // Carpeta pública para archivos estáticos

// Configuración del motor de plantillas (Handlebars)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas del proyecto
app.use("/api/products", productsRouter); // Rutas de productos
app.use("/api/carts", cartsRouter); // Rutas de carritos
app.use("/", viewsRouter); // Rutas para las vistas (home, realtime)

// Inicialización del servidor HTTP y de WebSockets
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Configuración de Socket.io
const io = new Server(httpServer);

// Guardar instancia de Socket.io para usarla desde otros módulos si es necesario
app.set("io", io);

// Eventos de conexión con WebSocket
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // Enviar lista actual de productos al nuevo cliente
  try {
    const products = await productManager.getProducts();
    socket.emit("updateProducts", products);
  } catch (error) {
    console.error("Error al enviar productos iniciales:", error);
  }

  // Evento: agregar un nuevo producto
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });

  // Evento: eliminar un producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });
});