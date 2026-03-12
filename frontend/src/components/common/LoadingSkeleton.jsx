import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
    const CardSkeleton = () => (
        <div className="card animate-pulse">
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg skeleton" />
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                    <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                    <div className="h-3 bg-gray-200 rounded skeleton w-full" />
                </div>
            </div>
        </div>
    );

    const ListSkeleton = () => (
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded skeleton w-full" />
            <div className="h-4 bg-gray-200 rounded skeleton w-5/6" />
            <div className="h-4 bg-gray-200 rounded skeleton w-4/6" />
        </div>
    );

    const skeletons = {
        card: <CardSkeleton />,
        list: <ListSkeleton />
    };

    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i}>{skeletons[type]}</div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
