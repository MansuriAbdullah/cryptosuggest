import React from 'react';
import {
    ArrowLeftRight,
    Image,
    Wallet,
    Coins,
    Search,
    Newspaper,
    GraduationCap,
    PieChart,
    LineChart,
    Gamepad2,
    CreditCard,
    Users,
    Lock,
    Zap,
    Layers,
    TrendingUp,
    BarChart3,
    Shield,
    Cpu
} from 'lucide-react';

// Icon mapping object
const iconMap = {
    ArrowLeftRight,
    Image,
    Wallet,
    Coins,
    Search,
    Newspaper,
    GraduationCap,
    PieChart,
    LineChart,
    Gamepad2,
    CreditCard,
    Users,
    Lock,
    Zap,
    Layers,
    TrendingUp,
    BarChart3,
    Shield,
    Cpu
};

const CategoryIcon = ({ iconName, className = "w-8 h-8" }) => {
    const IconComponent = iconMap[iconName];

    if (!IconComponent) {
        return <span className={className}>🔗</span>;
    }

    return <IconComponent className={className} />;
};

export default CategoryIcon;
