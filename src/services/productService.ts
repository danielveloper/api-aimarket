import { validate } from 'class-validator';

import { Product } from '../entities/product';
import { AppDataSource } from '../utils/database';

export class ProductService {

  static async getAllProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find();
  }

  static async createProduct(productData: { nombre: string; precio: number; categoria: string; descripcion: string; imagen: string }) {
    const productRepository = AppDataSource.getRepository(Product);
    const { nombre, precio, categoria, descripcion, imagen } = productData;

    const product = new Product();
    product.nombre = nombre;
    product.precio = precio;
    product.categoria = categoria;
    product.descripcion = descripcion;
    product.imagen = imagen;

    const errors = await validate(product);

    if (errors.length > 0) {
      return errors;
    }

    return await productRepository.save(product);
  }

  static async findProductsByCategory(category: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find({ where: { categoria: category } });
  }

  static async findProductById(id: number) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id } });

    return product;
  }

}
