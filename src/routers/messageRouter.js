import { Router } from 'express';
import messageController from '../controllers/messageController.js';
import { authorization } from '../middlewares/auth.js';

const router = Router();

router.get('/', authorization('User'), messageController.renderMessage);

export default router;