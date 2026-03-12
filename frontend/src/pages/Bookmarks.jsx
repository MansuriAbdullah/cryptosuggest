import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import WebsiteCard from '../components/website/WebsiteCard';
import { useBookmark } from '../contexts/BookmarkContext';
import Button from '../components/common/Button';

const Bookmarks = () => {
    const { bookmarks } = useBookmark();

    return (
        <PageLayout>
            <div className="bg-gradient-to-b from-blue-50 to-white pt-28 pb-12 mb-8">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                            <Heart className="w-10 h-10 text-red-500 fill-current" />
                            My Bookmarks
                        </h1>
                        <p className="text-xl text-gray-600">
                            Manage your saved crypto platforms and projects. Keep track of your favorites in one place.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8 mb-20">
                {bookmarks.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No bookmarks yet</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start exploring crypto platforms and save your favorites to access them quickly later.
                        </p>
                        <Link to="/browse">
                            <Button variant="primary" className="px-8 py-3">
                                Browse Platforms
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.map((website) => (
                            <WebsiteCard key={website.id} website={website} viewMode="grid" />
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default Bookmarks;
