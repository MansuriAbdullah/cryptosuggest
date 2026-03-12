import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight, Star, ExternalLink, Shield, AlertCircle, ToggleLeft, ToggleRight, Info, Award, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useCompare } from '../contexts/CompareContext';
import clsx from 'clsx';

const Compare = () => {
    const { selectedWebsites, removeFromCompare, clearCompare } = useCompare();
    const [highlightDiff, setHighlightDiff] = useState(false);

    if (selectedWebsites.length === 0) {
        return (
            <PageLayout>
                <div className="relative pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="container-custom relative z-10 text-center flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mb-8 relative border border-primary/20 shadow-2xl shadow-primary/10"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20"></div>
                            <Award className="w-16 h-16 text-primary" />
                        </motion.div>
                        <h1 className="text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Smartly</span></h1>
                        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Select up to 3 specialized platforms from our browse page to see a detailed side-by-side technical and performance comparison.
                        </p>
                        <Link to="/browse">
                            <Button size="lg" className="px-12 py-5 text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all rounded-2xl bg-gradient-to-r from-primary to-primary-dark">
                                Browse Platforms
                            </Button>
                        </Link>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Helper to check if a feature row matches across all selected
    const isDifferent = (key, type = 'feature') => {
        if (selectedWebsites.length < 2) return true;

        const first = type === 'feature'
            ? selectedWebsites[0].features[key]
            : selectedWebsites[0].details[key];

        return !selectedWebsites.every(site => {
            const val = type === 'feature' ? site.features[key] : site.details[key];
            return val === first;
        });
    };

    const featuresList = ['staking', 'mobileApp', 'api', 'support247', 'kycRequired', 'fiatSupport'];
    const detailsList = [
        { key: 'fees', label: 'Trading Fees Component' },
        { key: 'founded', label: 'Year Established' },
        { key: 'headquarters', label: 'Global HQ' },
    ];

    return (
        <PageLayout>
            <div className="bg-[#FAFBFF] min-h-screen pt-28 pb-24 relative overflow-hidden">
                {/* Global Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="container-custom relative z-10">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <Badge variant="primary" className="mb-4 shadow-sm border border-primary/20">Comparison Matrix</Badge>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">Side-by-Side <span className="text-primary">Analysis</span></h1>
                            <p className="text-lg text-slate-500 font-medium">
                                You are currently analyzing <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded-md shadow-sm border border-slate-200">{selectedWebsites.length}</span> out of 3 possible platforms
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60">
                            <button
                                onClick={() => setHighlightDiff(!highlightDiff)}
                                className={`flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all ${highlightDiff ? 'bg-primary/5 border-primary/20 shadow-inner' : 'hover:bg-slate-50 border-transparent'} border`}
                            >
                                <span className={`text-sm font-bold ${highlightDiff ? 'text-primary' : 'text-slate-600'}`}>Spot Differences</span>
                                {highlightDiff
                                    ? <ToggleRight className="w-7 h-7 text-primary" />
                                    : <ToggleLeft className="w-7 h-7 text-slate-300 group-hover:text-slate-400" />
                                }
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
                            <Button variant="outline" onClick={clearCompare} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100 px-4">
                                Clear
                            </Button>
                            <Link to="/browse">
                                <Button className="bg-slate-900 hover:bg-black text-white px-6 rounded-xl shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition-all">
                                    Add Platform
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="overflow-x-auto pb-16 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar rounded-3xl">
                            <div className="min-w-[1000px]">

                                {/* Sticky Header Row */}
                                <div className="grid grid-cols-4 gap-6 mb-10 sticky top-[88px] z-30 pt-6 pb-4 bg-[#FAFBFF]/80 backdrop-blur-xl border-b border-slate-200/50">
                                    <div className="col-span-1 flex items-end pb-6 pl-4">
                                        <div>
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                                                <Layers className="w-6 h-6 text-primary" />
                                            </div>
                                            <h2 className="font-extrabold text-3xl text-slate-900 tracking-tight">Overview</h2>
                                            <p className="text-sm text-slate-500 mt-1 font-medium">Select parameters to evaluate</p>
                                        </div>
                                    </div>
                                    {selectedWebsites.map((site, index) => (
                                        <motion.div
                                            key={site._id || site.id || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="col-span-1 relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 group hover:border-primary/40 transition-colors"
                                        >
                                            <button
                                                onClick={() => removeFromCompare(site._id || site.id)}
                                                className="absolute -top-3 -right-3 p-2 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 rounded-full shadow-md transition-all z-20 group-hover:scale-110"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            <div className="flex flex-col items-center">
                                                <div className="relative mb-5 w-24 h-24">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(site.name)}&size=96&background=random`}
                                                        alt={site.name}
                                                        className="w-full h-full object-cover rounded-2xl shadow-md border border-slate-100 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-extrabold text-center mb-2 text-slate-900 line-clamp-1">{site.name}</h3>
                                                <Badge variant="category" className="mb-6 bg-slate-50 border-slate-200 text-slate-600">{site.category}</Badge>

                                                <Link to={`/website/${site.slug}`} className="w-full mt-auto">
                                                    <Button size="sm" variant="outline" className="w-full border-slate-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all py-2.5 rounded-xl font-bold">
                                                        Deep Dive
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {/* Empty Placeholders */}
                                    {[...Array(3 - selectedWebsites.length)].map((_, i) => (
                                        <div key={`empty-${i}`} className="col-span-1 border-2 border-dashed border-slate-200 hover:border-primary/30 rounded-3xl flex items-center justify-center bg-white/40 backdrop-blur-sm self-stretch opacity-70 transition-colors group cursor-pointer">
                                            <Link to="/browse" className="text-center w-full h-full flex flex-col justify-center items-center py-10 px-6">
                                                <div className="w-16 h-16 bg-slate-100 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                                                    <ArrowRight className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                                                </div>
                                                <span className="text-base font-bold text-slate-500 group-hover:text-primary transition-colors">Add Competitor</span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* Comparison Sections */}
                                <div className="space-y-12">

                                    {/* Ratings Scorecard */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-6 pl-2">
                                            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                                <Star className="w-5 h-5 fill-current" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Metrics</h3>
                                        </div>
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                                            {[
                                                { label: 'Overall Rating', getValue: s => s.rating, type: 'star', highlight: true },
                                                { label: 'Trust Score', getValue: s => '98/100', type: 'score' }, // Mock score 
                                                { label: 'Total Reviews', getValue: s => s.reviewCount, type: 'number' }
                                            ].map((row, i) => (
                                                <div key={i} className={`grid grid-cols-4 gap-6 p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors ${row.highlight ? 'bg-slate-50/50' : ''}`}>
                                                    <div className="col-span-1 font-bold text-slate-700 flex items-center">{row.label}</div>
                                                    {selectedWebsites.map((site, s_index) => (
                                                        <div key={site._id || site.id || s_index} className="col-span-1 flex justify-center items-center font-extrabold text-xl text-slate-900 bg-white shadow-sm border border-slate-100 rounded-xl py-3 mx-4">
                                                            {row.type === 'star' && <Star className="w-5 h-5 text-yellow-500 fill-current mr-2 -mt-0.5" />}
                                                            {row.type === 'score' && <Shield className="w-5 h-5 text-emerald-500 mr-2 -mt-0.5" />}
                                                            {row.getValue(site)}
                                                            {row.type === 'star' && <span className="text-sm text-slate-400 ml-1 font-medium">/ 5.0</span>}
                                                        </div>
                                                    ))}
                                                    {[...Array(3 - selectedWebsites.length)].map((_, idx) => <div key={idx} className="col-span-1"></div>)}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Features - The main comparison */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-6 pl-2">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <Check className="w-5 h-5" strokeWidth={3} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Core Capabilities</h3>
                                        </div>
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                                            {featuresList.map((key) => {
                                                const different = isDifferent(key, 'feature');
                                                if (highlightDiff && !different) return null;

                                                return (
                                                    <div key={key} className={`grid grid-cols-4 gap-6 p-6 border-b border-slate-100 last:border-0 transition-all duration-300 ${different && highlightDiff ? 'bg-blue-50/60 shadow-inner scale-[1.01] z-10 relative' : 'hover:bg-slate-50/80'}`}>
                                                        <div className="col-span-1 flex items-center">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-700 capitalize text-lg">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                                <Info className="w-4 h-4 text-slate-400 cursor-help" />
                                                            </div>
                                                            {different && highlightDiff && <span className="ml-auto w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>}
                                                        </div>
                                                        {selectedWebsites.map((site, s_index) => (
                                                            <div key={site._id || site.id || s_index} className="col-span-1 flex justify-center items-center">
                                                                {site.features[key] ? (
                                                                    <div className="flex items-center gap-3 bg-emerald-50 px-5 py-2.5 rounded-xl border border-emerald-100 w-full justify-center mx-4">
                                                                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                                                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                                        </div>
                                                                        <span className="text-sm font-bold text-emerald-700">Supported</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100 w-full justify-center mx-4 opacity-70">
                                                                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                                                                            <X className="w-3.5 h-3.5" strokeWidth={3} />
                                                                        </div>
                                                                        <span className="text-sm font-bold text-slate-500">Missing</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {[...Array(3 - selectedWebsites.length)].map((_, idx) => <div key={idx} className="col-span-1"></div>)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    {/* Platform Details */}
                                    <section>
                                        <div className="flex items-center gap-3 mb-6 pl-2">
                                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                                                <ExternalLink className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Organization Profile</h3>
                                        </div>
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                                            {detailsList.map((row) => {
                                                const different = isDifferent(row.key, 'detail');
                                                if (highlightDiff && !different) return null;

                                                return (
                                                    <div key={row.key} className={`grid grid-cols-4 gap-6 p-6 border-b border-slate-100 last:border-0 transition-all duration-300 ${different && highlightDiff ? 'bg-blue-50/60 shadow-inner' : 'hover:bg-slate-50/80'}`}>
                                                        <div className="col-span-1 font-bold text-slate-700 flex items-center text-lg">{row.label}</div>
                                                        {selectedWebsites.map((site, s_index) => (
                                                            <div key={site._id || site.id || s_index} className="col-span-1 flex items-center justify-center">
                                                                <div className="text-center font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 w-full mx-4 truncate">
                                                                    {site.details[row.key]}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {[...Array(3 - selectedWebsites.length)].map((_, idx) => <div key={idx} className="col-span-1"></div>)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Compare;

