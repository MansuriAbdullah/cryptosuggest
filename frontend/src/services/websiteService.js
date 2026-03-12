import apiClient from '../api/client';

export const getWebsites = async (params = {}) => {
  return apiClient.get('/websites', { params });
};

export const getWebsiteBySlug = async (slug) => {
  return apiClient.get(`/websites/${slug}`);
};

export const getCategories = async () => {
  return apiClient.get('/categories');
};

export const submitWebsite = async (websiteData) => {
  return apiClient.post('/websites', websiteData);
};

export const getReviews = async (websiteId) => {
  return apiClient.get(`/reviews/website/${websiteId}`);
};

export const addReview = async (websiteId, reviewData) => {
  return apiClient.post(`/reviews/website/${websiteId}`, reviewData);
};
