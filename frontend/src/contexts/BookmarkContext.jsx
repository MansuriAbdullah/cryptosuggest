import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmark = () => {
    return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState(() => {
        try {
            const savedBookmarks = localStorage.getItem('bookmarks');
            return savedBookmarks ? JSON.parse(savedBookmarks) : [];
        } catch (error) {
            console.error('Failed to load bookmarks from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        } catch (error) {
            console.error('Failed to save bookmarks to localStorage', error);
        }
    }, [bookmarks]);

    const addBookmark = (website) => {
        const websiteId = website._id || website.id;
        if (!bookmarks.some(item => (item._id || item.id) === websiteId)) {
            setBookmarks([...bookmarks, website]);
        }
    };

    const removeBookmark = (id) => {
        setBookmarks(bookmarks.filter(item => (item._id || item.id) !== id));
    };

    const isBookmarked = (id) => {
        return bookmarks.some(item => (item._id || item.id) === id);
    };

    const toggleBookmark = (website) => {
        const websiteId = website._id || website.id;
        if (isBookmarked(websiteId)) {
            removeBookmark(websiteId);
        } else {
            addBookmark(website);
        }
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
};
