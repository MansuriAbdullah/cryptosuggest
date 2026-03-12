import express from 'express';
import {
    getWebsites,
    getWebsite,
    submitWebsite,
    trackClick,
    getAllWebsitesAdmin,
    updateWebsiteStatus
} from '../controllers/websiteController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getWebsites);
router.get('/admin/all', protect, authorize('admin'), getAllWebsitesAdmin);
router.get('/:slug', getWebsite);
router.post('/:id/click', trackClick);

// Private routes
router.post('/', submitWebsite);
router.put('/admin/:id', protect, authorize('admin'), updateWebsiteStatus);

export default router;
