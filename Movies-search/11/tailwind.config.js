export const darkMode = 'class';
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {
        animation: {
            fadeIn: 'fadeIn 0.3s ease-in-out',
            scaleIn: 'scaleIn 0.3s ease-in-out',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            scaleIn: {
                '0%': { transform: 'scale(0.95)', opacity: '0' },
                '100%': { transform: 'scale(1)', opacity: '1' },
            },
        },
    },
};
export const plugins = [];