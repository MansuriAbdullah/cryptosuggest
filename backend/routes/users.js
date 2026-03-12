import express from 'express';
import {
    getBookmarks,
    addBookmark,
    removeBookmark,
    getSubmissions,
    getAllUsers
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All user routes require auth

router.get('/bookmarks', getBookmarks);
router.post('/bookmarks/:websiteId', addBookmark);
router.delete('/bookmarks/:websiteId', removeBookmark);
router.get('/submissions', getSubmissions);

// Admin only
router.get('/admin', authorize('admin'), getAllUsers);

export default router;
