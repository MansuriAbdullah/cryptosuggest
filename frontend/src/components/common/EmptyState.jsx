import React from 'react';
import { SearchX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
    title = "No results found",
    description = "Try adjusting your search or filters",
    action = null,
    icon = null
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                {icon || <SearchX className="w-12 h-12 text-gray-400" />}
            </div>
            <h3 className="text-2xl font-bold text-text-main mb-2">{title}</h3>
            <p className="text-text-muted mb-6 max-w-md">{description}</p>
            {action && action}
        </div>
    );
};

export default EmptyState;
