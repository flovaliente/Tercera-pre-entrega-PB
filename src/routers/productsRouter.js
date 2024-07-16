import { Router } from 'express';

import { uploader } from '../utils/multerUtil.js';
import productsController from '../controllers/productsController.js';
import { authorization } from '../middlewares/auth.js';

const productsRouter = Router();

// -Get products-
productsRouter.get('/', productsController.getAllProducts);

// -Get product by id-
productsRouter.get('/:pid', productsController.getProductById);

// -Add product
productsRouter.post('/', uploader.array('thumbnails', 3), authorization('Admin'), productsController.addProduct);

// -Update product
productsRouter.put('/:pid', uploader.array('thumbnails', 3), authorization('Admin'), productsController.updateProduct);

// -Delete product
productsRouter.delete('/:pid', authorization('Admin'), productsController.deleteProduct);

export default productsRouter;