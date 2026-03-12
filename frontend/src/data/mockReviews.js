// Mock Reviews Data with Wallet Addresses
export const mockReviews = [
    // Binance Reviews
    {
        id: 'rev-001',
        websiteId: 'binance',
        walletAddress: '0xA91f2D8c3E4B5F6a7C8D9E0F1A2B3C4D5E6F7A8B',
        rating: 92,
        text: 'Binance has been my go-to exchange for years. The liquidity is unmatched, fees are competitive, and the platform is incredibly reliable. Their customer support has improved significantly over time.',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        verified: true,
        helpful: 45
    },
    {
        id: 'rev-002',
        websiteId: 'binance',
        walletAddress: '0xB82e3D9c4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C',
        rating: 78,
        text: 'Good exchange overall but the KYC process took longer than expected. Once verified, everything works smoothly. Wide range of trading pairs available.',
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        verified: true,
        helpful: 23
    },
    {
        id: 'rev-003',
        websiteId: 'binance',
        walletAddress: '0xC73f4E0d5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V',
        rating: 85,
        text: 'Excellent platform for both beginners and advanced traders. The mobile app is particularly well-designed. My only complaint is that some advanced features can be overwhelming at first.',
        timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
        verified: true,
        helpful: 31
    },
    // Coinbase Reviews
    {
        id: 'rev-004',
        websiteId: 'coinbase',
        walletAddress: '0xD84g5F1e6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W',
        rating: 88,
        text: 'Perfect for beginners! The interface is clean and intuitive. Fees are a bit higher than other exchanges, but the ease of use and security make it worth it for newcomers to crypto.',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        verified: true,
        helpful: 52
    },
    {
        id: 'rev-005',
        websiteId: 'coinbase',
        walletAddress: '0xE95h6G2f7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X',
        rating: 72,
        text: 'Reliable and secure, but the fees can add up quickly. Customer support is responsive when needed. Would recommend for casual investors rather than active traders.',
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
        verified: true,
        helpful: 18
    }
];

// Helper functions
export const getReviewsByWebsite = (websiteId) => {
    return mockReviews.filter(review => review.websiteId === websiteId);
};

export const calculateAverageRating = (websiteId) => {
    const reviews = getReviewsByWebsite(websiteId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / reviews.length);
};

export const hasUserReviewed = (websiteId, walletAddress) => {
    return mockReviews.some(
        review => review.websiteId === websiteId && review.walletAddress === walletAddress
    );
};

export default mockReviews;
