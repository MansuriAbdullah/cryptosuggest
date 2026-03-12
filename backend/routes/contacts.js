import express from 'express';
import { submitContact, getContacts, updateContactStatus } from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/admin', protect, authorize('admin'), getContacts);
router.put('/admin/:id', protect, authorize('admin'), updateContactStatus);

export default router;
