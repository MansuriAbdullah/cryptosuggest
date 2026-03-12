import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
    const [selectedWebsites, setSelectedWebsites] = useState(() => {
        const saved = localStorage.getItem('compareList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('compareList', JSON.stringify(selectedWebsites));
    }, [selectedWebsites]);

    const addToCompare = (website) => {
        if (selectedWebsites.length >= 3) {
            alert("You can compare up to 3 websites at a time.");
            return;
        }
        const websiteId = website._id || website.id;
        if (!selectedWebsites.find(w => (w._id || w.id) === websiteId)) {
            setSelectedWebsites([...selectedWebsites, website]);
        }
    };

    const removeFromCompare = (websiteId) => {
        setSelectedWebsites(selectedWebsites.filter(w => (w._id || w.id) !== websiteId));
    };

    const isInCompare = (websiteId) => {
        return selectedWebsites.some(w => (w._id || w.id) === websiteId);
    };

    const clearCompare = () => {
        setSelectedWebsites([]);
    };

    return (
        <CompareContext.Provider value={{ selectedWebsites, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};
