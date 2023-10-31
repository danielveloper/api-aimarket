import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const productRouter = Router();

productRouter.get('/', ProductController.getAllProducts);

productRouter.get('/find', ProductController.findProductByCategory);

productRouter.get('/find/:id', ProductController.findProductById);

export default productRouter;
