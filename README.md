# 🛵 ElectroRide - Ecommerce de Scooters y Bicicletas Eléctricas

**ElectroRide** es una tienda en línea desarrollada con **React**, **TypeScript** y **Tailwind CSS**, enfocada en la venta de scooters y bicicletas eléctricas. Ofrece una experiencia moderna con scroll infinito, filtros dinámicos y un carrito de compras persistente.

## 🚀 Funcionalidad Principal

- Visualización de productos eléctricos (scooters y bicicletas).
- Filtro por **color** y **rango de precio**.
- **Scroll infinito** para cargar más productos automáticamente.
- Carrito de compras con estado global manejado por `useReducer`.
- Persistencia del carrito en `localStorage`.

## 🧩 Tecnologías Utilizadas

- ⚛️ React
- 🟦 TypeScript
- 💨 Tailwind CSS
- 🧠 React Hooks (`useState`, `useEffect`, `useReducer`, `useRef`)
- 🗂️ localStorage

## 🎛️ Filtros

Los usuarios pueden refinar los productos por:

- **Color**: Blanca, Negra, Gris, Roja, Verde, Azul.
- **Rango de precio**:
  - $0 - $499
  - $500 - $699
  - $700 - $1000+
  - Todos

> ℹ️ **Nota:** Cuando se activa cualquier filtro, el scroll infinito se desactiva para evitar la repetición de productos.

## 🔄 Scroll Infinito

- Implementado con `IntersectionObserver`.
- Detecta cuando el usuario se acerca al final de la página.
- Genera dinámicamente más productos (simulación).
- Solo se activa cuando no hay filtros activos.

## 🛒 Carrito de Compras

- Controlado globalmente mediante `useReducer`.
- Persistido con `localStorage` para mantener el estado entre sesiones.
- Se actualiza automáticamente cada vez que el usuario agrega o modifica productos.

## 📁 Estructura del Proyecto

## 📁 Estructura del Proyecto

```plaintext
ELECTRORIDE/
├── node_modules/
├── public/
│   ├── img/
│   │   ├── basura.png
│   │   ├── cart.svg
│   │   ├── cart2.png
│   │   ├── header.jpg
│   │   ├── header2.png
│   │   ├── header3.avif
│   │   └── imagen-navbar.png
│   ├── imgProductos/
│   │   ├── producto_1.png
│   │   ├── producto_2.png
│   │   ├── producto_3.png
│   │   ├── producto_4.png
│   │   ├── producto_5.png
│   │   ├── producto_6.png
│   │   ├── producto_7.png
│   │   └── producto_8.png
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CardComponent.tsx
│   │   ├── FilterComponent.tsx
│   │   ├── HeaderComponent.tsx
│   │   ├── NavBarComponent.tsx
│   │   └── ProductComponent.tsx
│   ├── db/
│   │   └── db.ts
│   ├── reducers/
│   │   └── Cart-reducer.ts
│   ├── types/
│   │   └── type.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── tsconfig.json
```

## 📦 Datos Simulados

Todos los productos provienen de un archivo local (`db.ts`) que simula una base de datos. No se realiza ninguna conexión con backend o API externa.

## 🔗 Repositorio

👉 [Ver en GitHub](https://github.com/smithacevedo/ElectroRide.git)

---
