import React from 'react';
import { Check, Star, Clock } from 'lucide-react';

const Badge = ({
    children,
    variant = 'default',
    icon = null,
    className = ''
}) => {
    const baseStyles = 'badge';

    const variants = {
        verified: 'badge-verified',
        featured: 'badge-featured',
        category: 'badge-category',
        pending: 'bg-gray-100 text-gray-700 border border-gray-200',
        default: 'bg-blue-100 text-blue-700 border border-blue-200'
    };

    const icons = {
        verified: <Check className="w-4 h-4" />,
        featured: <Star className="w-4 h-4" />,
        pending: <Clock className="w-4 h-4" />
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {icon || icons[variant]}
            {children}
        </span>
    );
};

export default Badge;
