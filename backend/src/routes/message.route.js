import express from 'express';
const router = express.Router();
import { authUser } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sentMessages } from '../controllers/message.controller.js';


router.get('/user', authUser, getUsersForSidebar);
router.get('/:id', authUser, getMessages)
router.post('/send/:id', authUser, sentMessages);

export default router;