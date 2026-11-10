import express from 'express';
import userRoutes from './routes/user.routes.js';       // (Ya lo tienes)
import productRoutes from './routes/product.routes.js'; // 👈 1. Agrega esta línea

const app = express();

app.use(express.json()); // Para leer JSON en los POST

// Rutas
app.use('/api/users', userRoutes);       // (Ya lo tienes)
app.use('/api/products', productRoutes); // 👈 2. Agrega esta línea

export default app;