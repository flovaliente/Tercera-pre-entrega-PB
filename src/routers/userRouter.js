import { Router } from 'express';
import passport from 'passport';

import userController from '../controllers/userController.js';
import { passportCall } from '../utils/authUtil.js';
import { authorization } from '../middlewares/auth.js';

const router = Router();

router.post('/register', passport.authenticate("register", { failureRedirect: "/api/session/failRegister" }), userController.register);

router.get('/failRegister', userController.failRegister);

router.post("/login", userController.login);

router.get('/failLogin', userController.failLogin);

router.get('/logout', userController.logout);

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }), userController.github);

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), userController.githubcallback);

router.get('/current', passportCall('jwt'), authorization('User'), (req, res) =>{
    res.send({
        status: 'success',
        user: req.user
    });
});

export default router;