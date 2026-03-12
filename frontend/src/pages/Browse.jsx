import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Grid, List, Search, Filter, ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/common/Breadcrumb';
import WebsiteGrid from '../components/website/WebsiteGrid';
import { mockWebsites } from '../data/mockData';

const Browse = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('popular');
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    // Update state when URL params change (e.g. back button)
    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '');
    }, [searchParams]);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: category ? `${category} Websites` : 'Browse Websites' }
    ];

    const filteredWebsites = mockWebsites
        .filter(site => {
            const query = searchQuery.toLowerCase();
            const matchesSearch = (
                site.name.toLowerCase().includes(query) ||
                site.shortDescription.toLowerCase().includes(query) ||
                site.category.toLowerCase().includes(query)
            );

            // Loose matching for category to handle "DeFi" vs "defi" vs "Decentralized Finance"
            let matchesCategory = true;
            if (category) {
                const catSlug = category.toLowerCase();
                const siteCat = site.category.toLowerCase();
                matchesCategory = siteCat.includes(catSlug) || catSlug.includes(siteCat);
            }

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'popular') return (b.reviews || 0) - (a.reviews || 0);
            if (sortBy === 'newest') return new Date(b.verifiedDate) - new Date(a.verifiedDate);
            if (sortBy === 'az') return a.name.localeCompare(b.name);
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return 0;
        });

    return (
        <PageLayout>
            <div className="relative pb-20">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10 pt-28 pb-12">
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
                            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Crypto Websites</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl">
                            Discover the most trusted and verified cryptocurrency platforms, curated just for you.
                        </p>
                    </div>

                    {/* Search and Filters Bar */}
                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 mb-10 sticky top-24 z-20">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for exchanges, wallets, or tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none font-medium"
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3">
                                <div className="relative min-w-[160px]">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all duration-300 outline-none appearance-none font-medium cursor-pointer"
                                    >
                                        <option value="popular">🔥 Most Popular</option>
                                        <option value="newest">🆕 Newest First</option>
                                        <option value="rating">⭐ Highest Rated</option>
                                        <option value="az">🔤 A-Z</option>
                                    </select>
                                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                </div>

                                <div className="flex bg-gray-50/80 p-1.5 rounded-xl border border-gray-100">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {filteredWebsites.length}
                        </span>
                        <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">Results Found</span>
                    </div>

                    {/* Grid */}
                    <WebsiteGrid websites={filteredWebsites} viewMode={viewMode} />

                    {filteredWebsites.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-2">No websites found</h3>
                            <p className="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSortBy('popular'); }}
                                className="mt-6 text-primary font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default Browse;
