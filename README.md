# Entrega N°1 - Backend con Node.js y Express

## Descripción
Este proyecto corresponde a la **primera entrega del curso de Programación Backend I**.  
El objetivo es implementar un servidor con **Express** que gestione productos mediante un archivo `products.json` y carritos mediante un archivo `carts.json`, permitiendo realizar operaciones CRUD básicas a través de rutas API REST.

## 🚀 Funcionalidades

### Rutas para manejo de productos (`/api/products`)
- **GET /** → Devuelve todos los productos.
- **GET /:pid** → Devuelve un producto específico según su ID.
- **POST /** → Agrega un nuevo producto (el `id` se genera automáticamente).
- **PUT /:pid** → Actualiza los campos de un producto (sin modificar su `id`).
- **DELETE /:pid** → Elimina un producto según su ID.

### Rutas para manejo de carritos (`/api/carts`)
- **POST /** → Agrega un nuevo carrito vacío.
- **GET /:cid** → Devuelve un carrito especifico por su ID.
- **POST /:cid/product/:pid:** → Agregar un producto especifico por su ID a un carrito especifico.

## Estructura del proyecto
```
Entrega1/
│
├── src/
│ ├── app.js
│ ├── CartManager.js
│ ├── carts.json
│ ├── ProductManager.js
│ └── products.json
│
├── package-lock.json
├── package.json
└── README.md
```

## 👨‍💻 Autor
- Desarrollado por Sebastian Navales Parra
- 📧 Contacto: sebastian.navalesp@gmail.com
- 🌐 Portafolio: [Repositorio GitHub](https://github.com/sebastianavales)