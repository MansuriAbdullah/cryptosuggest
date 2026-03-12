import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { Mail, Clock, MessageCircle, HelpCircle, Send, CheckCircle, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'general',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            console.log('Contact form submitted:', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'general', message: '' });

            // Reset status after 3 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    const faqs = [
        {
            question: 'How to submit a website?',
            answer: 'Visit our Submit Website page, fill out the details. We review within 3-5 business days.',
            icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
            color: 'bg-yellow-50'
        },
        {
            question: 'Is listing free?',
            answer: 'Yes! Basic listing is free. We verify all submissions for safety.',
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            color: 'bg-green-50'
        },
        {
            question: 'Reporting a scam?',
            answer: 'Use the "Report" subject in this form or flag it directly on the website page.',
            icon: <AlertCircle className="w-5 h-5 text-red-500" />,
            color: 'bg-red-50'
        },
        {
            question: 'Edit my listing?',
            answer: 'Send us a message with your website details and requested changes.',
            icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
            color: 'bg-blue-50'
        }
    ];

    return (
        <PageLayout>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-background-soft pt-20 pb-32">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/10 to-pink-500/10 blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white border border-primary/20 shadow-sm animate-fade-in">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold tracking-wide text-sm uppercase">
                            Connect With Us
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-text-main mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        We'd Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Hear From You</span>
                    </h1>

                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Have a question, feedback, or just want to say hello? Drop us a message and our team will get back to you.
                    </p>
                </div>
            </div>

            <div className="container-custom pb-24 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-8 md:p-10">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MessageCircle className="w-6 h-6 text-primary" />
                                    Send us a Message
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-text-main ml-1">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-text-main ml-1">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-text-main ml-1">Subject</label>
                                        <div className="relative">
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 appearance-none cursor-pointer"
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="report">Report a Website</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="technical">Technical Issue</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-text-main ml-1">Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 min-h-[160px]"
                                            placeholder="How can we help you today?"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={status === ('submitting' || status === 'success')}
                                            className={`w-full py-4 text-lg shadow-lg shadow-primary/20 ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : ''}`}
                                        >
                                            {status === 'submitting' ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : status === 'success' ? (
                                                <span className="flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Message Sent!
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message <Send className="w-5 h-5" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Contact Info Card */}
                        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl shadow-xl shadow-blue-500/20 p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-tr-full"></div>

                            <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
                                <Mail className="w-5 h-5" /> Contact Info
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Email Us</p>
                                    <a href="mailto:hello@cryptosuggest.com" className="text-lg font-bold hover:text-white/90 transition-colors">
                                        hello@cryptosuggest.com
                                    </a>
                                </div>

                                <div>
                                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Response Time</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-accent-light" />
                                        <span className="text-lg font-bold">24-48 Hours</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/20">
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Our team reviews every submission manually to ensure the highest quality for our community.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-purple-500" />
                                Common Questions
                            </h3>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="group p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-default border border-transparent hover:border-gray-100">
                                        <div className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${faq.color} flex items-center justify-center`}>
                                                {faq.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-text-main text-sm group-hover:text-primary transition-colors">{faq.question}</h4>
                                                <p className="text-xs text-text-muted mt-1 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Contact;
