import { Router } from 'express';
const router = Router();
import { createUser, editUser, isAdmin } from '../controllers/userController.js';

router.post('/create',isAdmin, createUser);
router.put('/:userId/edit',isAdmin, editUser);

export default router;
