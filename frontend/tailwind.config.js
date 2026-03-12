/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'xs': '320px',   // Small phones
            'sm': '640px',   // Large phones
            'md': '768px',   // Tablets
            'lg': '1024px',  // Small laptops
            'xl': '1280px',  // Desktop
            '2xl': '1536px', // Large desktop
            '3xl': '1920px', // Full HD
            '4xl': '2560px', // 2K/4K displays
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1F8FE5',
                    dark: '#0B3C5D',
                    light: '#4FC3F7',
                },
                accent: {
                    DEFAULT: '#4FC3F7',
                    light: '#80D4FA',
                },
                background: {
                    soft: '#F5F9FC',
                    white: '#FFFFFF',
                },
                text: {
                    main: '#1F2933',
                    muted: '#6B7280',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'glow': '0 0 20px rgba(31, 143, 229, 0.3)',
            },
        },
    },
    plugins: [],
}
