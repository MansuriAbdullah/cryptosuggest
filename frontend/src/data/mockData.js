// Aggregated Mock Data Exports
import mockCategories from './mockCategories';
import mockWebsites from './mockWebsites';
import mockReviews from './mockReviews';
import mockTestimonials from './mockTestimonials';

export { mockCategories, mockWebsites, mockReviews, mockTestimonials };

// Helper functions
export const getCategoryBySlug = (slug) => {
    return mockCategories.find(cat => cat.slug === slug);
};

export const getWebsiteBySlug = (slug) => {
    return mockWebsites.find(site => site.slug === slug);
};

export const getWebsitesByCategory = (categoryName) => {
    return mockWebsites.filter(site => site.category === categoryName);
};

export const getReviewsByWebsiteId = (websiteId) => {
    return mockReviews.filter(review => review.websiteId === websiteId);
};

export const getFeaturedWebsites = () => {
    return mockWebsites.filter(site => site.featured);
};

export const getVerifiedWebsites = () => {
    return mockWebsites.filter(site => site.verified);
};

export const searchWebsites = (query) => {
    const lowerQuery = query.toLowerCase();
    return mockWebsites.filter(site =>
        site.name.toLowerCase().includes(lowerQuery) ||
        site.shortDescription.toLowerCase().includes(lowerQuery) ||
        site.category.toLowerCase().includes(lowerQuery)
    );
};

export const getRecentlyVerifiedWebsites = (limit = 4) => {
    return mockWebsites
        .filter(site => site.verified)
        .sort((a, b) => new Date(b.verifiedDate) - new Date(a.verifiedDate))
        .slice(0, limit);
};
