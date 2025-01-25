import express from 'express';
const router = express.Router();

import { login, logout, signup, update, checkAuth } from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';


router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.put('/update', authUser, update)

router.get('/check', authUser, checkAuth);

export default router;