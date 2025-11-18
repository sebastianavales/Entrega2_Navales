# Entrega N°2 - WebSockets y Handlebars

## Descripción
Este proyecto corresponde a la **segunda entrega del curso de Programación Backend I**.

El objetivo es configurar un servidor con Express, Handlebars y Socket.io para gestionar productos y carritos en tiempo real.

Además de mantener las operaciones CRUD mediante rutas HTTP, se implementa una vista dinámica que refleja los cambios automáticamente al crear, actualizar o eliminar productos.

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

### Vistas con Handlebars
- **/ - /home** → Muestra la lista de todos los productos almacenados hasta el momento.
- **/realtimeproducts** → Renderiza la misma lista, pero conectada a Socket.io. Cada vez que se agrega, actualiza o elimina un producto desde la API, la vista se actualiza automáticamente sin recargar la página.

## 📦 Estructura del proyecto
```
Entrega2/
│
├── src/
│ │ 
│ ├── data/
│ │ ├── carts.json
│ │ └── products.json
│ │
│ ├── managers/
│ │ ├── CartManager.js
│ │ └── ProductManager.js
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