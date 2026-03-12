import React from 'react';
import WebsiteCard from './WebsiteCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

const WebsiteGrid = ({ websites, loading = false, viewMode = 'grid' }) => {
    if (loading) {
        return <LoadingSkeleton type="card" count={6} />;
    }

    if (!websites || websites.length === 0) {
        return <EmptyState />;
    }

    if (viewMode === 'list') {
        return (
            <div className="space-y-4">
                {websites.map(website => (
                    <WebsiteCard key={website.id} website={website} viewMode="list" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map(website => (
                <WebsiteCard key={website.id} website={website} viewMode="grid" />
            ))}
        </div>
    );
};

export default WebsiteGrid;
