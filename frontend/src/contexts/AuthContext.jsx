import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get('/auth/me');
                if (response.success) {
                    setUser(response.data);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    // Login user
    const login = async (email, password) => {
        setError(null);
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            if (response.success) {
                localStorage.setItem('token', response.token);
                setUser(response.data);
                return { success: true };
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, message: err.message };
        }
    };

    // Register user
    const register = async (userData) => {
        setError(null);
        try {
            const response = await apiClient.post('/auth/register', userData);
            if (response.success) {
                localStorage.setItem('token', response.token);
                setUser(response.data);
                return { success: true };
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
            return { success: false, message: err.message };
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
