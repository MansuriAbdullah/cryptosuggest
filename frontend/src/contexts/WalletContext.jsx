import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within WalletProvider');
    }
    return context;
};

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletType, setWalletType] = useState(null);
    const [connectedAt, setConnectedAt] = useState(null);

    // Load wallet state from localStorage on mount
    useEffect(() => {
        const savedConnection = localStorage.getItem('walletConnection');
        if (savedConnection) {
            try {
                const connection = JSON.parse(savedConnection);
                setIsConnected(connection.isConnected);
                setWalletAddress(connection.address);
                setWalletType(connection.type);
                setConnectedAt(connection.connectedAt);
            } catch (error) {
                console.error('Failed to restore wallet connection:', error);
                localStorage.removeItem('walletConnection');
            }
        }
    }, []);

    // Generate a mock wallet address
    const generateMockAddress = () => {
        const chars = '0123456789abcdef';
        let address = '0x';
        for (let i = 0; i < 40; i++) {
            address += chars[Math.floor(Math.random() * chars.length)];
        }
        return address;
    };

    // Simulate wallet connection
    const connectWallet = async (type = 'MetaMask') => {
        return new Promise((resolve) => {
            // Simulate connection delay
            setTimeout(() => {
                const address = generateMockAddress();
                const timestamp = Date.now();

                setIsConnected(true);
                setWalletAddress(address);
                setWalletType(type);
                setConnectedAt(timestamp);

                // Save to localStorage
                const connection = {
                    isConnected: true,
                    address,
                    type,
                    connectedAt: timestamp
                };
                localStorage.setItem('walletConnection', JSON.stringify(connection));

                resolve({ success: true, address });
            }, 1500); // 1.5 second delay to simulate real connection
        });
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress(null);
        setWalletType(null);
        setConnectedAt(null);
        localStorage.removeItem('walletConnection');
    };

    // Get truncated address for display
    const getTruncatedAddress = () => {
        if (!walletAddress) return '';
        return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    };

    const value = {
        isConnected,
        walletAddress,
        walletType,
        connectedAt,
        connectWallet,
        disconnectWallet,
        getTruncatedAddress
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};
