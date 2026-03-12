import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import WebsiteDetail from './pages/WebsiteDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmitWebsite from './pages/SubmitWebsite';
import Compare from './pages/Compare';
import { CompareProvider } from './contexts/CompareContext';
import { WalletProvider } from './contexts/WalletContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { AuthProvider } from './contexts/AuthContext';
import CompareBar from './components/common/CompareBar';
import Bookmarks from './pages/Bookmarks';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <AuthProvider>
            <WalletProvider>
                <CompareProvider>
                    <BookmarkProvider>
                        <Router>
                            <ScrollToTop />
                            <div className="min-h-screen bg-background-soft font-sans text-text-main">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/browse" element={<Browse />} />
                                    <Route path="/category/:category" element={<Browse />} />
                                    <Route path="/website/:slug" element={<WebsiteDetail />} />
                                    <Route path="/categories" element={<Categories />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/compare" element={<Compare />} />
                                    <Route path="/bookmarks" element={
                                        <ProtectedRoute>
                                            <Bookmarks />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/submit" element={<SubmitWebsite />} />
                                    <Route path="/profile" element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                                <CompareBar />
                            </div>
                        </Router>
                    </BookmarkProvider>
                </CompareProvider>
            </WalletProvider>
        </AuthProvider>
    );
}

export default App;
