import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import WalletConnectionModal from '../wallet/WalletConnectionModal';

const WriteReviewButton = ({ onClick }) => {
    const { isConnected } = useWallet();
    const [showWalletModal, setShowWalletModal] = useState(false);

    const handleClick = () => {
        if (!isConnected) {
            setShowWalletModal(true);
        } else {
            onClick();
        }
    };

    const handleWalletConnected = () => {
        setShowWalletModal(false);
        onClick();
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3"
            >
                <Edit3 className="w-5 h-5" />
                <span>Write a Review</span>
            </button>

            {showWalletModal && (
                <WalletConnectionModal
                    isOpen={showWalletModal}
                    onClose={() => setShowWalletModal(false)}
                />
            )}
        </>
    );
};

export default WriteReviewButton;
