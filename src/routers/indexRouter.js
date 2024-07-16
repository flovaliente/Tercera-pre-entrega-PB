import { Router } from 'express';

import indexController from '../controllers/indexController.js';

const router = Router();

router.get('/', indexController.welcome);

router.get('/register', indexController.register);

router.get('/products', indexController.products);

router.get('/cart', indexController.cart);

router.get('/realtimeproducts', indexController.realtimeproducts);

router.get('/login', indexController.login);

export default router;