import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;