import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const productRouter = Router();

productRouter.get('/', ProductController.getAllProducts);

productRouter.get('/findByCategory', ProductController.findProductByCategory);

productRouter.get('/findById/:id', ProductController.findProductById);

export default productRouter;
