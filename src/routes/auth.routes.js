import { Router } from 'express';
import Auth from '../controllers/auth.controller.js';
import { redirectIfAuthenticated } from '../middlewares/auth.jwt.js';

const auth = new Auth()
const router = Router()

// Rutas para el login
router.get('/login',redirectIfAuthenticated, auth.getLogin)
router.post('/login', auth.postLogin)

// Rutas para signup
router.get('/signup',redirectIfAuthenticated, auth.getSignup)
router.post('/signup', auth.postSignup)

// ruta logout
router.get('/logout', auth.logout)

export default router