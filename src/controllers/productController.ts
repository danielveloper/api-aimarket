import { Request, Response } from 'express';

import { ProductService } from '../services/productService';
import logger from '../utils/logger';
import { ResponseUtil } from '../utils/response';

export class ProductController {

  static async getAllProducts(req: Request, res: Response) {

    try {

      const products = await ProductService.getAllProducts();
      if (!products) {
        throw new Error('No existen productos');
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

}
