import React from 'react';

const RatingDisplay = ({ rating, totalReviews }) => {
    // Get rating color based on score
    const getRatingColor = (score) => {
        if (score >= 90) return 'from-green-500 to-green-600';
        if (score >= 70) return 'from-blue-500 to-blue-600';
        if (score >= 50) return 'from-yellow-500 to-yellow-600';
        return 'from-red-500 to-red-600';
    };

    // Get rating text
    const getRatingText = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Poor';
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100">
            <div className="text-center">
                {/* Rating Score */}
                <div className={`inline-flex items-baseline gap-2 bg-gradient-to-r ${getRatingColor(rating)} bg-clip-text text-transparent mb-4`}>
                    <span className="text-6xl font-bold">{rating}</span>
                    <span className="text-3xl font-semibold">/100</span>
                </div>

                {/* Rating Text */}
                <div className="mb-6">
                    <div className="text-2xl font-bold text-text-main mb-2">
                        {getRatingText(rating)}
                    </div>
                    <div className="text-text-muted">
                        Based on <span className="font-semibold text-text-main">{totalReviews}</span> {totalReviews === 1 ? 'review' : 'reviews'}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${getRatingColor(rating)} transition-all duration-500`}
                        style={{ width: `${rating}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RatingDisplay;
