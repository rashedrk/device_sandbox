/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                toastSlide: {
                    'from': {
                        opacity: '0',
                        transform: 'translateX(-50%) translateY(90px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateX(-50%) translateY(70px)',
                    },
                },
                fadeOut: {
                    'to': {
                        opacity: '0',
                        transform: 'translateX(-50%) translateY(90px)',
                    },
                },
            },
            animation: {
                'toast-slide': 'toastSlide 0.4s ease forwards',
                'fade-out': 'fadeOut 0.5s ease forwards',
            },
        },
    },
    plugins: [],
}