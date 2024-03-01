import { Router } from 'express';
const router = Router();
import { createGroup, deleteGroup, searchGroups, addMember } from '../controllers/groupController.js';

router.post('/create', createGroup);
router.delete('/:groupId/delete', deleteGroup);
router.get('/search', searchGroups);
router.put('/:groupId/addMember', addMember);

export default router;
