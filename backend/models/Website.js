import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Website name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Crypto Exchanges',
            'NFT Marketplaces',
            'Crypto Wallets',
            'DeFi Platforms',
            'Blockchain Explorers',
            'Crypto News & Media',
            'Learning & Education',
            'Portfolio Trackers',
            'Analytics & Research',
            'Gaming & Metaverse',
            'Payment Gateways',
            'DAO & Governance',
            'Security Tools',
            'Trading Bots',
            'Staking Platforms'
        ]
    },
    subCategory: {
        type: String,
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [200, 'Short description cannot exceed 200 characters']
    },
    longDescription: {
        type: String,
        maxlength: [2000, 'Long description cannot exceed 2000 characters']
    },
    logo: {
        type: String,
        default: ''
    },
    screenshot: {
        type: String,
        default: ''
    },
    features: {
        mobileApp: { type: Boolean, default: false },
        kycRequired: { type: Boolean, default: false },
        fiatSupport: { type: Boolean, default: false },
        apiAccess: { type: Boolean, default: false },
        multiChain: { type: Boolean, default: false },
        openSource: { type: Boolean, default: false },
        twoFA: { type: Boolean, default: false },
        coldStorage: { type: Boolean, default: false },
        insurance: { type: Boolean, default: false }
    },
    details: {
        founded: { type: Number },
        headquarters: { type: String },
        supportedCountries: { type: Number },
        languages: [{ type: String }],
        blockchains: [{ type: String }],
        fees: { type: String }
    },
    pros: [{ type: String }],
    cons: [{ type: String }],
    trustScore: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    verifiedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Auto-generate slug from name before saving
websiteSchema.pre('save', function (next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

// Indexes for fast querying
websiteSchema.index({ category: 1, status: 1 });
websiteSchema.index({ featured: 1, status: 1 });
websiteSchema.index({ name: 'text', shortDescription: 'text', longDescription: 'text' });

export default mongoose.model('Website', websiteSchema);
