import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Shield, Calendar, LogOut, ArrowRight, Bookmark, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/common/Button';

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const stats = [
        { label: 'Bookmarks', value: user.bookmarks?.length || 0, icon: Bookmark, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Submissions', value: user.submissions?.length || 0, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Reviews', value: 0, icon: Shield, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <PageLayout>
            <div className="container-custom py-12 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Profile Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-blue-100 border border-gray-100 mb-10 overflow-hidden relative"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                <div className="relative h-24 w-24 sm:h-32 sm:w-32 bg-white rounded-full flex items-center justify-center p-1">
                                    <div className="h-full w-full bg-blue-50 rounded-full flex items-center justify-center text-primary">
                                        <User className="h-12 w-12 sm:h-16 sm:w-16" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                                    {user.role === 'admin' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider self-center md:self-auto">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {user.email}</div>
                                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                                    <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined February 2024</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Link to="/bookmarks">
                                    <Button variant="outline" className="!rounded-xl font-bold">Manage Bookmarks</Button>
                                </Link>
                                <button 
                                    onClick={logout}
                                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (i + 1) }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6"
                            >
                                <div className={`${stat.bg} ${stat.color} h-16 w-16 rounded-2xl flex items-center justify-center`}>
                                    <stat.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-gray-900 to-black p-8 sm:p-10 rounded-[2rem] text-white overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Submit a Website</h3>
                            <p className="text-gray-400 mb-8 font-medium leading-relaxed relative z-10">
                                Found a great crypto project? Share it with the community and help us grow the most trusted directory.
                            </p>
                            <Link to="/submit">
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 group relative z-10">
                                    Get Started <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-blue-600 p-8 sm:p-10 rounded-[2rem] text-white overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Account Security</h3>
                            <p className="text-blue-100 mb-8 font-medium leading-relaxed relative z-10">
                                Keep your account safe. Update your password or manage your session settings anytime.
                            </p>
                            <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 relative z-10">
                                Security Settings
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Profile;
