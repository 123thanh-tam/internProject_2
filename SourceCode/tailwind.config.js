/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        borderWidth: {
            default: "1px",
        },
        fontFamily: {
            Nunito: ["Nunito", "sans-serif"],
        },
        extend: {
            width: {
                "300px": "300px",
                "25.5rem": "25.5rem",
            },
            spacing: {
                "Am-21%": "-21%",
                "39%": "39%",
                "Am-10%": "-10%",
                "30%": "30%",
                91: "91px",
                63: "63px",
                1: "1px",
            },

            boxShadow: {
                "shadow-service": "2px 2px 15px 10px rgba(0,0,0, 0.05)",
            },
            colors: {
                "light-green": "#86B817",
                "dark-opacity": "rgba(0,0,0, 0.5);",
            },
            height: {
                1: "1px",
                300: "300px",
                17.5: "17.5rem",
            },
        },
    },
    plugins: [],
};
