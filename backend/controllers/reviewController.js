import Review from '../models/Review.js';

// @desc    Get all reviews for a website
// @route   GET /api/reviews/website/:websiteId
// @access  Public
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ website: req.params.websiteId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });
        res.json({ success: true, count: reviews.length, reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Add a review
// @route   POST /api/reviews/website/:websiteId
// @access  Private
export const addReview = async (req, res) => {
    try {
        const review = await Review.create({
            website: req.params.websiteId,
            user: req.user.id,
            ...req.body
        });
        const populated = await review.populate('user', 'name avatar');
        res.status(201).json({ success: true, review: populated });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this website' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
        }
        await review.deleteOne();
        res.json({ success: true, message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
