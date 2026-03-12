import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { useCompare } from '../../contexts/CompareContext';
import Button from './Button';

const CompareBar = () => {
    const { selectedWebsites, removeFromCompare, clearCompare } = useCompare();

    if (selectedWebsites.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className="fixed bottom-4 sm:bottom-8 left-0 right-0 mx-auto z-[60] w-auto max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] md:max-w-4xl flex justify-center pointer-events-none"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-200/80 p-2 sm:p-3 flex items-center gap-2 sm:gap-4 overflow-hidden pointer-events-auto max-w-full">
                    {/* Icon section */}
                    <div className="flex-shrink-0 hidden lg:flex items-center gap-2 bg-blue-50/50 text-primary px-4 py-2.5 rounded-xl font-bold text-sm border border-blue-100/50">
                        <Layers className="w-5 h-5" />
                        <span>Compare ({selectedWebsites.length}/3)</span>
                    </div>

                    {/* Sites Scroll Area */}
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1 min-w-[80px] scroll-smooth px-1">
                        {selectedWebsites.map((site, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                key={site._id || site.id || idx} 
                                className="relative group flex-shrink-0 flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-200 rounded-xl pl-2 pr-8 py-1.5 shadow-sm transition-all duration-300 h-[44px]"
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(site.name)}&size=32&background=random`}
                                    alt={site.name}
                                    className="w-6 h-6 rounded-lg flex-shrink-0 shadow-sm"
                                />
                                <span className="text-sm font-bold text-slate-700 truncate max-w-[70px] sm:max-w-[100px]">{site.name}</span>
                                
                                <button
                                    onClick={() => removeFromCompare(site._id || site.id)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors opacity-70 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0 pl-1 sm:pl-2 border-l border-slate-100">
                        <button
                            onClick={clearCompare}
                            className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors px-2 py-2 hidden sm:block"
                        >
                            Clear
                        </button>
                        <Link to="/compare" className="flex-shrink-0">
                            <Button className="flex-shrink-0 shadow-md shadow-primary/20 whitespace-nowrap bg-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all rounded-xl px-4 sm:px-6 py-2.5 text-sm sm:text-base font-bold h-[44px]">
                                <Sparkles className="w-4 h-4 mr-1.5 opacity-80 hidden sm:inline-block" />
                                Compare
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CompareBar;
