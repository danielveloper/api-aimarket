import { Request, Response } from 'express';

import { ProductService } from '../services/productService';
import logger from '../utils/logger';
import { ResponseUtil } from '../utils/response';

export class ProductController {

  static async createProduct(req: Request, res: Response) {
    try {
      const { nombre, precio, categoria, descripcion, imagen } = req.body;

      if (!nombre || !precio || !categoria || !descripcion || !imagen) {
        throw new Error('Todos los campos son requeridos para crear un producto.');
      }

      const productData = {
        nombre,
        precio,
        categoria,
        descripcion,
        imagen,
      };

      const createdProduct = await ProductService.createProduct(productData);

      if (createdProduct instanceof Array && createdProduct.length > 0) {
        // Si hay errores de validación, responde con un código 400 y los errores.
        res.status(400).json({ success: false, errors: createdProduct });
        return;
      }

      ResponseUtil.successResponse(res, {
        product: createdProduct,
      });
    } catch (error: unknown) {
      logger.error(error);

      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
      }
    }
  }


  static async getAllProducts(req: Request, res: Response) {

    try {

      const products = await ProductService.getAllProducts();
      if (!products) {
        throw new Error('No existe producto.');
      }
      ResponseUtil.successResponse(res, {
        products
      });
    } catch (error: unknown) {

      logger.error(error);
      if (error instanceof Error) {
        if (error.name === 'ValidationError') {
          res.status(400).json({ success: false, error });
          return;
        }
        res.status(500).json({ success: false, error: error.message });
        return;
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
        return;
      }
    }
  }

  static async findProductByCategory(req: Request, res: Response) {
    try {
      const { category } = req.query;
      if (!category) {
        throw new Error('La categoría es requerida en la consulta.');
      }

      const products = await ProductService.findProductsByCategory(category as string);

      if (!products.length) {
        throw new Error('No se encontraron productos para la categoría especificada.');
      }

      ResponseUtil.successResponse(res, {
        products
      });
    } catch (error: unknown) {

      logger.error(error);
      if (error instanceof Error) {
        if (error.name === 'ValidationError') {
          res.status(400).json({ success: false, error });
          return;
        } else if (error.message === 'No se encontraron productos para la categoría especificada.') {
          res.status(404).json({ success: false, error: error.message });
          return;
        }
        res.status(500).json({ success: false, error: error.message });
        return;
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
        return;
      }
    }
  }

  static async findProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        throw new Error('El ID del producto es requerido en la consulta.');
      }

      const product = await ProductService.findProductById(id);
      if (!product) {
        throw new Error('Producto no encontrado.');
      }

      ResponseUtil.successResponse(res, {
        product
      });
    } catch (error: unknown) {

      logger.error(error);
      if (error instanceof Error) {
        if (error.name === 'ValidationError') {
          res.status(400).json({ success: false, error });
          return;
        }
        res.status(500).json({ success: false, error: error.message });
        return;
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
        return;
      }
    }
  }

}
