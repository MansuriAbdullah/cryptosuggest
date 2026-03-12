import Website from '../models/Website.js';

// Static category metadata - mirrors the frontend mock
const categoriesMeta = [
    { id: 1, name: 'Crypto Exchanges', slug: 'crypto-exchanges', icon: 'ArrowLeftRight', description: 'Trusted cryptocurrency exchanges for buying, selling, and trading digital assets', subCategories: ['Centralized Exchanges', 'Decentralized Exchanges', 'Peer-to-Peer'], featured: true },
    { id: 2, name: 'NFT Marketplaces', slug: 'nft-marketplaces', icon: 'Image', description: 'Leading platforms for buying, selling, and creating NFTs', subCategories: ['Art NFTs', 'Gaming NFTs', 'Music NFTs', 'Domain NFTs'], featured: true },
    { id: 3, name: 'Crypto Wallets', slug: 'crypto-wallets', icon: 'Wallet', description: 'Secure wallets for storing and managing your cryptocurrencies', subCategories: ['Hardware Wallets', 'Software Wallets', 'Mobile Wallets', 'Web Wallets'], featured: true },
    { id: 4, name: 'DeFi Platforms', slug: 'defi-platforms', icon: 'Coins', description: 'Decentralized finance platforms for lending, borrowing, and yield farming', subCategories: ['Lending', 'DEX', 'Yield Farming', 'Liquidity Pools'], featured: true },
    { id: 5, name: 'Blockchain Explorers', slug: 'blockchain-explorers', icon: 'Search', description: 'Tools to explore and analyze blockchain transactions and addresses', subCategories: ['Bitcoin Explorers', 'Ethereum Explorers', 'Multi-Chain'], featured: true },
    { id: 6, name: 'Crypto News & Media', slug: 'crypto-news-media', icon: 'Newspaper', description: 'Latest news, analysis, and insights from the crypto world', subCategories: ['News Sites', 'Podcasts', 'YouTube Channels', 'Newsletters'], featured: true },
    { id: 7, name: 'Learning & Education', slug: 'learning-education', icon: 'GraduationCap', description: 'Educational resources to learn about blockchain and cryptocurrencies', subCategories: ['Courses', 'Tutorials', 'Documentation', 'Books'], featured: true },
    { id: 8, name: 'Portfolio Trackers', slug: 'portfolio-trackers', icon: 'PieChart', description: 'Track and manage your crypto portfolio performance', subCategories: ['Mobile Apps', 'Web Apps', 'Desktop Apps'], featured: true },
    { id: 9, name: 'Analytics & Research', slug: 'analytics-research', icon: 'LineChart', description: 'Data analytics and research tools for crypto markets', subCategories: ['Market Data', 'On-Chain Analytics', 'Research Reports'], featured: false },
    { id: 10, name: 'Gaming & Metaverse', slug: 'gaming-metaverse', icon: 'Gamepad2', description: 'Blockchain-based games and metaverse platforms', subCategories: ['Play-to-Earn', 'Virtual Worlds', 'Gaming Guilds'], featured: false },
    { id: 11, name: 'Payment Gateways', slug: 'payment-gateways', icon: 'CreditCard', description: 'Accept and process cryptocurrency payments', subCategories: ['Merchant Services', 'Payment Processors', 'Point of Sale'], featured: false },
    { id: 12, name: 'DAO & Governance', slug: 'dao-governance', icon: 'Users', description: 'Decentralized autonomous organizations and governance tools', subCategories: ['DAO Platforms', 'Voting Tools', 'Treasury Management'], featured: false },
    { id: 13, name: 'Security Tools', slug: 'security-tools', icon: 'Lock', description: 'Security auditing and protection tools for crypto assets', subCategories: ['Auditing', 'Monitoring', 'Insurance'], featured: false },
    { id: 14, name: 'Trading Bots', slug: 'trading-bots', icon: 'Zap', description: 'Automated trading bots and strategies', subCategories: ['Grid Trading', 'DCA Bots', 'Arbitrage'], featured: false },
    { id: 15, name: 'Staking Platforms', slug: 'staking-platforms', icon: 'Layers', description: 'Platforms for staking cryptocurrencies and earning rewards', subCategories: ['Proof of Stake', 'Liquid Staking', 'Staking Pools'], featured: false }
];

// @desc    Get all categories with live website counts
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const counts = await Website.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        const countMap = {};
        counts.forEach(c => { countMap[c._id] = c.count; });

        // Merge mock structure with live counts
        const categories = mockCategories.map(cat => ({
            ...cat,
            websiteCount: countMap[cat.name] || 0
        }));

        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
