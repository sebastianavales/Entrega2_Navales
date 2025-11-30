# Entrega Final

## Descripción
Este proyecto corresponde a la **entrega final   del curso de Programación Backend I**.

Se implementa un servidor con Express y Handlebars para gestionar productos y carritos, con persistencia en MongoDB.

Además de mantener las operaciones CRUD mediante rutas HTTP, se ofrecen vistas dinámicas para consultar productos, agregar al carrito y visualizar el contenido del carrito.

## 🚀 Funcionalidades

### Rutas para manejo de productos (`/api/products`)
- **GET /** → Devuelve todos los productos.
- **GET /:pid** → Devuelve un producto específico según su ID.
- **POST /** → Agrega un nuevo producto (el `id` se genera automáticamente).
               Se emite una actualización en tiempo real a todos los clientes conectados.
- **PUT /:pid** → Actualiza los campos de un producto (sin modificar su `id`).
                  También actualiza la vista en tiempo real.
- **DELETE /:pid** → Elimina un producto según su ID.
                     Emite la actualización en tiempo real a todos los clientes.

### Rutas para manejo de carritos (`/api/carts`)
- **POST /** → Agrega un nuevo carrito vacío.
- **GET /:cid** → Devuelve un carrito especifico por su ID.
- **POST /:cid/product/:pid:** → Agregar un producto especifico por su ID a un carrito especifico.
- **PUT /:cid** → Actualiza todos los productos del carrito con un arreglo de productos.
- **PUT /:cid/products/:pid** → Actualiza la cantidad de un producto específico en el carrito.
- **DELETE /:cid** → Elimina todos los productos del carrito.

### Vistas con Handlebars
- **/ - /home** → Muestra la lista de todos los productos almacenados hasta el momento.
- **/cart/:cid** → Muestra el contenido de un carrito específico, con cantidad de cada producto y total.
- **/realtimeproducts** → Renderiza la misma lista, pero conectada a Socket.io. Cada vez que se agrega, actualiza o elimina un producto desde la API, la vista se actualiza automáticamente sin recargar la página.

## 📦 Estructura del proyecto
```
Entrega2/
│
├── src/
│ │ 
│ ├── models/
│ │ ├── cart.model.js
│ │ └── product.model.js
│ │
│ ├── public/
│ │ └── js/
│ │  └── realTime.js
│ │
│ ├── routes/
│ │ ├── carts.router.js
│ │ ├── products.router.js
│ │ └── views.router.js
│ │
│ ├── views/
│ │ ├── layouts/
│ │ │ └── main.handlebars
│ │ ├── cart.handlebars
│ │ ├── home.handlebars
│ │ └── realTimeProducts.handlebars
│ │
│ └── app.js
│
├── package-lock.json
├── package.json
└── README.md
```

## 👨‍💻 Autor
- Desarrollado por Sebastian Navales Parra
- 📧 Contacto: sebastian.navalesp@gmail.com
- 🌐 Portafolio: [Repositorio GitHub](https://github.com/sebastianavales)