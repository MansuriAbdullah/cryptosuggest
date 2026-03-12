import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { Shield, Users, TrendingUp, Award, Globe, Zap, Search, CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
    return (
        <PageLayout>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-background-soft pt-20 pb-32 box-content">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white border border-primary/20 shadow-sm animate-fade-in">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold tracking-wide text-sm uppercase">
                            About Crypto Suggest
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-main mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Navigating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">Crypto World</span> <br />
                        <span className="relative">
                            With Confidence
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99996 86.643 3.6369 200 6.99997C200 6.99997 93.3005 -3.53507 2.00025 6.99997Z" fill="currentColor" /></svg>
                        </span>
                    </h1>

                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        We're on a mission to simplify your crypto journey by curating the most trusted, secure, and innovative platforms in one place.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-12 bg-white relative z-20 -mt-16 container-custom">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 mb-2">500+</div>
                        <div className="text-text-muted font-medium">Verified Websites</div>
                    </div>
                    <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-2">50k+</div>
                        <div className="text-text-muted font-medium">Monthly Users</div>
                    </div>
                    <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-2">15+</div>
                        <div className="text-text-muted font-medium">Categories</div>
                    </div>
                    <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">24/7</div>
                        <div className="text-text-muted font-medium">Monitoring</div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-20 container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                                <Search className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-text-main">Our Mission</h2>
                            <p className="text-text-muted leading-relaxed">
                                To eliminate the noise and scams in the crypto space by providing a meticulously verified directory of legitimate projects. We believe everyone deserves a safe entry point into Web3.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
                                <Globe className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-text-main">Our Vision</h2>
                            <p className="text-text-muted leading-relaxed">
                                A world where cryptocurrency adoption is hindered only by curiosity, not fear. We aim to be the global standard for crypto reputation and discovery.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 relative z-10 border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-center">Why We Started</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mt-1">
                                        <span className="font-bold text-lg">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">The Scam Epidemic</h4>
                                        <p className="text-text-muted text-sm">We saw too many newcomers losing funds to phishing sites and rug pulls.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1">
                                        <span className="font-bold text-lg">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Information Overload</h4>
                                        <p className="text-text-muted text-sm">Thousands of projects launching daily made it impossible to filter quality.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                                        <span className="font-bold text-lg">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">The Solution</h4>
                                        <p className="text-text-muted text-sm">A centralized, vetted hub for safe crypto exploration.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-20 bg-background-soft">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Process</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">How We Ensure <span className="text-primary">Quality</span></h2>
                        <p className="text-text-muted text-lg">Every website on Crypto Suggest goes through a rigorous multi-step verification process.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: "Security Audit",
                                desc: "SSL, Domain Age, and Contract Checks",
                                color: "from-blue-400 to-blue-600",
                                shadow: "shadow-blue-500/20"
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Team Verif.",
                                desc: "Background checks on core team members",
                                color: "from-indigo-400 to-indigo-600",
                                shadow: "shadow-indigo-500/20"
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: "Performance",
                                desc: "Active user base and volume analysis",
                                color: "from-purple-400 to-purple-600",
                                shadow: "shadow-purple-500/20"
                            },
                            {
                                icon: <Award className="w-6 h-6" />,
                                title: "Community",
                                desc: "Social sentiment and feedback analysis",
                                color: "from-pink-400 to-pink-600",
                                shadow: "shadow-pink-500/20"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-300 group">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 ${item.shadow} shadow-lg group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-text-muted text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 container-custom">
                <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-indigo-700"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Explore Safely?</h2>
                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join thousands of users who trust Crypto Suggest for their daily crypto discovery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/browse">
                                <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                    Browse Websites
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default About;
