import { Router } from 'express';
import productRoutes from './product.routes.js';

const router = Router();

// Aquí conectamos el prefijo /products con nuestro archivo de rutas
router.use('/products', productRoutes);

export default router;