import React, { useState, useEffect } from 'react';
import RatingDisplay from './RatingDisplay';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import WriteReviewButton from './WriteReviewButton';
import { getReviewsByWebsite, calculateAverageRating } from '../../data/mockReviews';

const WebsiteReviews = ({ websiteId }) => {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    // Load reviews from localStorage and mock data
    useEffect(() => {
        // Get mock reviews
        const mockReviews = getReviewsByWebsite(websiteId);

        // Get user reviews from localStorage
        const userReviewsStr = localStorage.getItem('userReviews');
        const userReviews = userReviewsStr ? JSON.parse(userReviewsStr) : [];

        // Filter user reviews for this website
        const websiteUserReviews = userReviews.filter(r => r.websiteId === websiteId);

        // Combine and sort by timestamp
        const allReviews = [...mockReviews, ...websiteUserReviews].sort(
            (a, b) => b.timestamp - a.timestamp
        );

        setReviews(allReviews);

        // Calculate average rating
        if (allReviews.length > 0) {
            const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating(Math.round(sum / allReviews.length));
        }
    }, [websiteId]);

    const handleSubmitReview = (newReview) => {
        // Add to localStorage
        const userReviewsStr = localStorage.getItem('userReviews');
        const userReviews = userReviewsStr ? JSON.parse(userReviewsStr) : [];
        userReviews.push(newReview);
        localStorage.setItem('userReviews', JSON.stringify(userReviews));

        // Update state
        setReviews([newReview, ...reviews]);

        // Recalculate average
        const allReviews = [newReview, ...reviews];
        const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(Math.round(sum / allReviews.length));

        // Close form and show success
        setShowReviewForm(false);

        // Show success message (you can add a toast notification here)
        alert('✅ Review submitted successfully!');
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
                            Reviews & Ratings
                        </h2>
                        <p className="text-xl text-text-muted">
                            See what the community thinks about this platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Rating Display */}
                        <div className="lg:col-span-1">
                            <RatingDisplay rating={averageRating} totalReviews={reviews.length} />
                            <div className="mt-6">
                                <WriteReviewButton onClick={() => setShowReviewForm(true)} />
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2">
                            <ReviewsList reviews={reviews} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    websiteId={websiteId}
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={handleSubmitReview}
                />
            )}
        </div>
    );
};

export default WebsiteReviews;
