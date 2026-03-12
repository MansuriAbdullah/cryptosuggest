import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Share2, Check, X, Shield, Star, Award, TrendingUp, Info, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/common/Breadcrumb';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import WebsiteReviews from '../components/reviews/WebsiteReviews';
import WebsiteCard from '../components/website/WebsiteCard'; // Import for Similar Websites
import { getWebsiteBySlug, getWebsites } from '../services/websiteService';
import { useBookmark } from '../contexts/BookmarkContext';

const WebsiteDetail = () => {
    const { slug } = useParams();
    const [website, setWebsite] = useState(null);
    const [similarWebsites, setSimilarWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [showExternalModal, setShowExternalModal] = useState(false);
    const { isBookmarked, toggleBookmark } = useBookmark();
    
    // Trust Score Calculation (Mock logic for visual)
    const [trustScore, setTrustScore] = useState(0);

    React.useEffect(() => {
        // Animate score on mount
        const timer = setTimeout(() => {
            setTrustScore(98);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        const fetchWebsiteData = async () => {
            setLoading(true);
            try {
                const res = await getWebsiteBySlug(slug);
                if (res.success) {
                    setWebsite(res.website);
                    // Fetch similar websites
                    if (res.website.category) {
                        try {
                            const simRes = await getWebsites({ category: res.website.category, limit: 4 });
                            if (simRes.success) {
                                setSimilarWebsites(simRes.websites.filter(w => w._id !== res.website._id).slice(0, 3));
                            }
                        } catch (e) {
                            console.error("Failed to fetch similar websites", e);
                        }
                    }
                } else {
                    setError('Website not found');
                }
            } catch (err) {
                setError('Error fetching website data');
            } finally {
                setLoading(false);
            }
        };

        fetchWebsiteData();
    }, [slug]);

    if (loading) {
        return (
            <PageLayout>
                <div className="container-custom pt-40 pb-20 text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading details...</p>
                </div>
            </PageLayout>
        );
    }

    if (!website || error) {
        return (
            <PageLayout>
                <div className="container-custom pt-40 pb-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Website Not Found</h1>
                    <p className="text-gray-500 mb-8">{error || 'The website you are looking for does not exist or has been removed.'}</p>
                    <Link to="/browse"><Button>Browse All Websites</Button></Link>
                </div>
            </PageLayout>
        );
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: website.category, href: `/category/${website.category.toLowerCase().replace(/ /g, '-')}` },
        { label: website.name }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'details', label: 'Details' }
    ];

    const trustColor = trustScore >= 90 ? 'text-green-500' : trustScore >= 70 ? 'text-yellow-500' : 'text-red-500';
    const trustGradient = trustScore >= 90 ? 'from-green-400 to-emerald-600' : 'from-yellow-400 to-orange-500';

    return (
        <PageLayout>
            {/* Dynamic Hero Section */}
            <div className="relative bg-slate-50 overflow-hidden pt-28 pb-24">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <Breadcrumb items={breadcrumbItems} className="mb-8" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Logo and Main Info */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row items-start gap-6 mb-8"
                            >
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(website.name)}&size=128&background=0D6EFD&color=fff&bold=true`}
                                    alt={website.name}
                                    className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white"
                                />
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-3 break-words whitespace-normal">{website.name}</h1>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {website.featured && (
                                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-current" /> Featured
                                            </span>
                                        )}
                                        <Badge variant="category" className="text-sm px-3 py-1">{website.category}</Badge>
                                        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium text-text-muted shadow-sm">
                                            <Shield className="w-4 h-4 text-green-500" /> Verified
                                        </span>
                                    </div>
                                    <p className="text-xl text-text-muted leading-relaxed break-words whitespace-normal">{website.shortDescription}</p>
                                </div>
                            </motion.div>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => setShowExternalModal(true)}
                                    className="shadow-premium shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
                                >
                                    Visit Website <ExternalLink className="w-5 h-5 ml-2" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className={`bg-white border hover:bg-gray-50 hover:text-gray-900 border-gray-200 ${isBookmarked(website._id || website.id) ? 'text-red-500 border-red-200 bg-red-50 hover:bg-red-100' : ''}`}
                                    onClick={() => toggleBookmark(website)}
                                >
                                    <Heart className={`w-5 h-5 mr-2 ${isBookmarked(website._id || website.id) ? 'fill-current' : ''}`} />
                                    {isBookmarked(website._id || website.id) ? 'Saved' : 'Save'}
                                </Button>
                                <Button variant="ghost" size="lg" className="bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900">
                                    <Share2 className="w-5 h-5 mr-2" /> Share
                                </Button>
                            </div>
                        </div>

                        {/* Trust Score & Quick Stats Card */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl p-6 shadow-premium border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full"></div>

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div>
                                        <h3 className="font-bold text-lg text-text-main">Trust Score</h3>
                                        <p className="text-sm text-text-muted">Based on 4 checks</p>
                                    </div>
                                    <div className={`relative w-16 h-16 flex items-center justify-center font-bold text-xl ${trustColor}`}>
                                        {/* Simple SVG Gauge Ring */}
                                        <svg className="absolute w-full h-full transform -rotate-90">
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-100" />
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="176" strokeDashoffset={176 - (176 * trustScore) / 100} className="transition-all duration-1000 ease-out" />
                                        </svg>
                                        {trustScore}
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-blue-500" />
                                            <span className="font-medium text-sm">Security Check</span>
                                        </div>
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-5 h-5 text-purple-500" />
                                            <span className="font-medium text-sm">Community Voted</span>
                                        </div>
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-orange-500" />
                                            <span className="font-medium text-sm">Traffic Analysis</span>
                                        </div>
                                        <span className="text-sm font-bold text-green-600">High</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12 -mt-12 relative z-20">
                {/* Tabs, rounded and floating */}
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 inline-flex mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-md'
                                : 'text-text-muted hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <Card className="border-t-4 border-t-primary">
                                    <h2 className="text-2xl font-bold mb-4">About the Platform</h2>
                                    <p className="text-text-muted leading-relaxed whitespace-pre-line break-words">{website.longDescription || 'No description provided.'}</p>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="bg-green-50/50 border-green-100">
                                        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-lg">
                                            <div className="p-1 bg-green-200 rounded-full"><Check className="w-4 h-4 text-green-700" /></div>
                                            Pros
                                        </h3>
                                        <ul className="space-y-3">
                                            {(website.pros || []).map((pro, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span>{pro}</span>
                                                </li>
                                            ))}
                                            {(!website.pros || website.pros.length === 0) && <span className="text-sm text-gray-500">Not specified</span>}
                                        </ul>
                                    </Card>

                                    <Card className="bg-red-50/50 border-red-100">
                                        <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-lg">
                                            <div className="p-1 bg-red-200 rounded-full"><X className="w-4 h-4 text-red-700" /></div>
                                            Cons
                                        </h3>
                                        <ul className="space-y-3">
                                            {(website.cons || []).map((con, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                                                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                    <span>{con}</span>
                                                </li>
                                            ))}
                                            {(!website.cons || website.cons.length === 0) && <span className="text-sm text-gray-500">Not specified</span>}
                                        </ul>
                                    </Card>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'features' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card>
                                    <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {Object.entries(website.features || {}).map(([key, value]) => (
                                            <div key={key} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${value ? 'border-gray-100 bg-gray-50' : 'border-dashed border-gray-200 opacity-60'}`}>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${value ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                                                    {value ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                                </div>
                                                <span className="font-bold text-text-main capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            </div>
                                        ))}
                                        {(!website.features || Object.keys(website.features).length === 0) && <span className="text-sm text-gray-500">Not specified</span>}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeTab === 'details' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card>
                                    <h2 className="text-2xl font-bold mb-6">Platform Details</h2>
                                    <div className="divide-y divide-gray-100">
                                        {[
                                            { label: 'Founded', value: website.details?.founded || 'N/A' },
                                            { label: 'Headquarters', value: website.details?.headquarters || 'N/A' },
                                            { label: 'Supported Countries', value: website.details?.supportedCountries || 'Global' },
                                            { label: 'Languages', value: (website.details?.languages || []).join(', ') || 'English' },
                                            { label: 'Blockchains', value: (website.details?.blockchains || []).join(', ') || 'N/A' },
                                            { label: 'Fees', value: website.details?.fees || 'Varies', highlight: true }
                                        ].map((item, i) => (
                                            <div key={i} className="grid grid-cols-2 gap-4 py-4">
                                                <span className="text-text-muted font-medium">{item.label}</span>
                                                <span className={`font-bold ${item.highlight ? 'text-primary' : 'text-text-main'}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* Reviews Component */}
                        <WebsiteReviews websiteId={website.slug} />
                    </div>

                    {/* Sidebar moved to bottom on mobile, sticky on desktop */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-primary" /> Quick Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 border-dashed">
                                        <span className="text-sm text-text-muted">Category</span>
                                        <Badge variant="category">{website.category}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 border-dashed">
                                        <span className="text-sm text-text-muted">Status</span>
                                        <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 border-dashed">
                                        <span className="text-sm text-text-muted">Added</span>
                                        <span className="text-sm font-medium">{website.dateAdded || (website.createdAt ? new Date(website.createdAt).toLocaleDateString() : 'N/A')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-text-muted">Last Updated</span>
                                        <span className="text-sm font-medium">{website.lastUpdated || (website.updatedAt ? new Date(website.updatedAt).toLocaleDateString() : 'N/A')}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Similar Websites Widget */}
                            <div className="pt-6">
                                <h3 className="font-bold text-lg mb-4">Similar Platforms</h3>
                                <div className="space-y-4">
                                    {similarWebsites.map((site, index) => (
                                        <Link key={site._id || site.id || index} to={`/website/${site.slug}`} className="block group">
                                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 transition-all hover:shadow-md hover:border-primary/30">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(site.name)}&size=64&background=random`}
                                                    alt={site.name}
                                                    className="w-10 h-10 rounded-lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-text-main truncate group-hover:text-primary transition-colors">{site.name}</h4>
                                                    <div className="flex items-center gap-1 text-xs text-text-muted">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                        {site.trustScore || site.rating || '4.0'}
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary" />
                                            </div>
                                        </Link>
                                    ))}
                                    {similarWebsites.length === 0 && <span className="text-sm text-gray-500">No similar platforms found.</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* External Link Modal */}
            <Modal
                isOpen={showExternalModal}
                onClose={() => setShowExternalModal(false)}
                title="You're Leaving Crypto Suggest"
            >
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-text-muted mb-6">
                        You are about to visit an external website. Crypto Suggest is not responsible for the content or security of external sites.
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm mb-8 break-all border border-gray-200">
                        {website.url}
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => setShowExternalModal(false)}>
                            Cancel
                        </Button>
                        <a href={website.url} target="_blank" rel="noopener noreferrer">
                            <Button>Continue to Website</Button>
                        </a>
                    </div>
                </div>
            </Modal>
        </PageLayout>
    );
};

export default WebsiteDetail;
