import Website from '../models/Website.js';

// @desc    Get all approved websites (with filtering, sorting, search, pagination)
// @route   GET /api/websites
// @access  Public
export const getWebsites = async (req, res) => {
    try {
        const { category, featured, search, sort, page = 1, limit = 20 } = req.query;
        const query = { status: 'approved' };

        if (category) query.category = category;
        if (featured === 'true') query.featured = true;
        if (search) query.$text = { $search: search };

        const sortMap = {
            'trust': { trustScore: -1 },
            'reviews': { reviewCount: -1 },
            'newest': { createdAt: -1 },
            'views': { views: -1 }
        };
        const sortBy = sortMap[sort] || { featured: -1, trustScore: -1 };

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [websites, total] = await Promise.all([
            Website.find(query).sort(sortBy).skip(skip).limit(parseInt(limit)),
            Website.countDocuments(query)
        ]);

        res.json({
            success: true,
            count: websites.length,
            total,
            pages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            websites
        });
    } catch (err) {
        console.error('Error in getWebsites:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get single website by slug
// @route   GET /api/websites/:slug
// @access  Public
export const getWebsite = async (req, res) => {
    try {
        const website = await Website.findOne({ slug: req.params.slug, status: 'approved' });
        if (!website) {
            return res.status(404).json({ success: false, message: 'Website not found' });
        }
        // Increment view count
        website.views += 1;
        await website.save({ validateBeforeSave: false });
        res.json({ success: true, website });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Submit a new website
// @route   POST /api/websites
// @access  Private
export const submitWebsite = async (req, res) => {
    try {
        req.body.submittedBy = req.user ? req.user.id : null;
        req.body.status = 'approved'; 
        req.body.trustScore = 4.0; 
        req.body.features = {
            mobileApp: false,
            kycRequired: false,
            fiatSupport: true
        };
        const website = await Website.create(req.body);

        // Update user's submittedWebsites if logged in
        if (req.user) {
            const User = (await import('../models/User.js')).default;
            await User.findByIdAndUpdate(req.user.id, { $push: { submittedWebsites: website._id } });
        }

        res.status(201).json({ success: true, message: 'Website submitted successfully', website });
    } catch (err) {
        console.error("Submission Error Details:", err);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'A website with this name already exists' });
        }
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: err.message || 'Server Error' });
    }
};

// @desc    Track click on a website link
// @route   POST /api/websites/:id/click
// @access  Public
export const trackClick = async (req, res) => {
    try {
        await Website.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin: Get all websites (including pending)
// @route   GET /api/websites/admin/all
// @access  Private/Admin
export const getAllWebsitesAdmin = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = status ? { status } : {};
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [websites, total] = await Promise.all([
            Website.find(query).populate('submittedBy', 'name email').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Website.countDocuments(query)
        ]);
        res.json({ success: true, total, websites });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin: Approve / reject website
// @route   PUT /api/websites/admin/:id
// @access  Private/Admin
export const updateWebsiteStatus = async (req, res) => {
    try {
        const { status, featured, verified } = req.body;
        const update = {};
        if (status) update.status = status;
        if (featured !== undefined) update.featured = featured;
        if (verified !== undefined) {
            update.verified = verified;
            if (verified) update.verifiedDate = new Date();
        }
        const website = await Website.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!website) return res.status(404).json({ success: false, message: 'Website not found' });
        res.json({ success: true, website });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
