import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <PageLayout>
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-20">
                <h1 className="text-9xl font-bold text-primary/10">404</h1>
                <h2 className="text-3xl font-bold -mt-8 mb-4">Page Not Found</h2>
                <p className="text-text-muted mb-8 max-w-md">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/">
                    <Button size="lg">Return Home</Button>
                </Link>
            </div>
        </PageLayout>
    );
};

export default NotFound;
