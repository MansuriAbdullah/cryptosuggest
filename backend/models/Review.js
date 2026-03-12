import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: [true, 'Review title is required'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    body: {
        type: String,
        required: [true, 'Review body is required'],
        maxlength: [1000, 'Review cannot exceed 1000 characters']
    },
    pros: [{ type: String, maxlength: 100 }],
    cons: [{ type: String, maxlength: 100 }],
    helpful: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// One review per user per website
reviewSchema.index({ website: 1, user: 1 }, { unique: true });

// Update website trust score after saving/removing a review
reviewSchema.post('save', async function () {
    const Website = mongoose.model('Website');
    const stats = await mongoose.model('Review').aggregate([
        { $match: { website: this.website } },
        { $group: { _id: '$website', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (stats.length > 0) {
        await Website.findByIdAndUpdate(this.website, {
            trustScore: Math.round(stats[0].avgRating * 10) / 10,
            reviewCount: stats[0].count
        });
    }
});

export default mongoose.model('Review', reviewSchema);
