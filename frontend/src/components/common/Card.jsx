import React from 'react';

const Card = ({
    children,
    hover = false,
    featured = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'card';
    const hoverStyles = hover ? 'card-hover cursor-pointer' : '';
    const featuredStyles = featured ? 'ring-2 ring-primary shadow-glow' : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${featuredStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
