import User from '../models/User.js';
import Website from '../models/Website.js';

// @desc    Get user bookmarks
// @route   GET /api/users/bookmarks
// @access  Private
export const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('bookmarks');
        res.json({ success: true, bookmarks: user.bookmarks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Add website to bookmarks
// @route   POST /api/users/bookmarks/:websiteId
// @access  Private
export const addBookmark = async (req, res) => {
    try {
        const website = await Website.findById(req.params.websiteId);
        if (!website) return res.status(404).json({ success: false, message: 'Website not found' });

        const user = await User.findById(req.user.id);
        if (user.bookmarks.includes(req.params.websiteId)) {
            return res.status(400).json({ success: false, message: 'Website already bookmarked' });
        }
        user.bookmarks.push(req.params.websiteId);
        await user.save();
        res.json({ success: true, message: 'Bookmark added' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Remove website from bookmarks
// @route   DELETE /api/users/bookmarks/:websiteId
// @access  Private
export const removeBookmark = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { bookmarks: req.params.websiteId } });
        res.json({ success: true, message: 'Bookmark removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get user's submitted websites
// @route   GET /api/users/submissions
// @access  Private
export const getSubmissions = async (req, res) => {
    try {
        const websites = await Website.find({ submittedBy: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, websites });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin: Get all users
// @route   GET /api/users/admin
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [users, total] = await Promise.all([
            User.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            User.countDocuments()
        ]);
        res.json({ success: true, total, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
