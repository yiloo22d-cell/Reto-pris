// Importamos Prisma desde la carpeta que se generó automáticamente
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para Obtener todos los productos (GET)
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products); // Responde con la lista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para Crear un producto (POST)
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, price, stock },
    });
    res.status(201).json(product); // Responde con el producto recién creado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para Eliminar un producto (DELETE)
export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(404).json({ error: 'No se encontró el producto' });
  }
};