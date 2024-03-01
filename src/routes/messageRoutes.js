import { Router } from 'express';
const router = Router();
import { sendMessage, likeMessage } from '../controllers/messageController.js';

router.post('/:groupId/send', sendMessage);
router.post('/:messageId/like', likeMessage);

export default router;
