/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html,css}",
        "./public/pages/*.html",
    ],
    theme: {
        extend: {
            colors: {
                "background-alt": "var(--background-alt)",
                "background": "var(--background)",
                "negative": "var(--negative)",
            },
            borderRadius: {
                DEFAULT: "var(--corners)"
            }
        },
    },
    plugins: [],
}

