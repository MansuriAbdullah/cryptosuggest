import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Breadcrumb from '../components/common/Breadcrumb';
import Card from '../components/common/Card';
import { mockCategories } from '../data/mockData';

const Categories = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'All Categories' }
    ];

    // Helper to dynamically get icon component
    const getIconComponent = (iconName) => {
        const Icon = LucideIcons[iconName] || LucideIcons.HelpCircle;
        return <Icon className="w-8 h-8 text-white" />;
    };

    const getGradient = (index) => {
        const gradients = [
            'from-blue-500 to-cyan-400',
            'from-purple-500 to-indigo-500',
            'from-pink-500 to-rose-500',
            'from-orange-500 to-yellow-500',
            'from-emerald-500 to-teal-500',
            'from-cyan-500 to-blue-500'
        ];
        return gradients[index % gradients.length];
    };

    return (
        <PageLayout>
            <div className="relative pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] z-0 opacity-30 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10 pt-28 pb-12">
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 animate-fade-in">
                            <span className="text-primary font-bold tracking-wide text-xs uppercase">
                                Directory
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">
                            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Category</span>
                        </h1>
                        <p className="text-text-muted text-xl leading-relaxed">
                            Browse our curated list of crypto platforms by category. Find the perfect tools and services tailored to your needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mockCategories.map((category, index) => (
                            <Link key={category.id} to={`/category/${category.slug}`} className="block h-full group">
                                <div className="h-full bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 relative overflow-hidden">
                                    {/* Gradient Header Background */}
                                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getGradient(index)}`}></div>

                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                            {getIconComponent(category.icon)}
                                        </div>
                                        <div className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-xs font-bold text-text-muted">
                                            {category.websiteCount}+ Apps
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">{category.name}</h3>
                                    <p className="text-text-muted text-sm mb-6 leading-relaxed line-clamp-2">{category.description}</p>

                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {category.subCategories.slice(0, 3).map((sub, idx) => (
                                                <span key={idx} className="text-xs px-2.5 py-1.5 bg-gray-50 text-gray-600 rounded-lg border border-gray-100 font-medium group-hover:bg-white group-hover:shadow-sm transition-all">
                                                    {sub}
                                                </span>
                                            ))}
                                            {category.subCategories.length > 3 && (
                                                <span className="text-xs px-2.5 py-1.5 bg-gray-50 text-gray-400 rounded-lg font-medium">
                                                    +{category.subCategories.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="pt-6 mt-2 border-t border-gray-50 flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
                                            <span>Explore Collection</span>
                                            <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Categories;
