import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.producto.findMany();
    return res.status(200).json({
      success: true,
      total: products.length,
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Los campos "name", "price" y "stock" son obligatorios'
      });
    }

    const newProduct = await prisma.producto.create({
      data: {
        name,
        price: parseInt(price, 10),
        stock: parseInt(stock, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// actualizar un producto existente
export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, price, stock } = req.body;

    // verificar
    const existingProduct = await prisma.producto.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado para actualizar'
      });
    }

    const updatedProduct = await prisma.producto.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock, 10) })
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// eliminar un producto por ID
export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // verificar
    const existingProduct = await prisma.producto.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado para eliminar'
      });
    }

    await prisma.product.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: `Producto con ID ${id} eliminado correctamente`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}