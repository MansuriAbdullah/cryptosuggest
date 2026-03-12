import React from 'react';
import { Star, Check } from 'lucide-react';

const ReviewCard = ({ review }) => {
    // Truncate wallet address
    const getTruncatedAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Format timestamp
    const getTimeAgo = (timestamp) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        const days = Math.floor(seconds / 86400);

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    };

    // Get rating color
    const getRatingColor = (rating) => {
        if (rating >= 90) return 'text-green-600 bg-green-50';
        if (rating >= 70) return 'text-blue-600 bg-blue-50';
        if (rating >= 50) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-premium hover-lift transition-all duration-300 border border-gray-100">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    {/* Wallet Address */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">
                                {review.walletAddress.slice(2, 4).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-semibold text-text-main">
                                    {getTruncatedAddress(review.walletAddress)}
                                </span>
                                {review.verified && (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                                        <Check className="w-3 h-3 text-green-600" />
                                        <span className="text-xs font-semibold text-green-700">Verified</span>
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-text-muted">{getTimeAgo(review.timestamp)}</span>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className={`px-4 py-2 rounded-xl font-bold text-lg ${getRatingColor(review.rating)}`}>
                    {review.rating}/100
                </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(review.rating / 20)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-base text-text-main leading-relaxed mb-4">
                {review.text}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
                    <span>👍</span>
                    <span>Helpful ({review.helpful})</span>
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
