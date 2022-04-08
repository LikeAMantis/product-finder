const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // gray: colors.neutral,
                primary: colors.blue[500],
                "primary-highlight": colors.blue[400],
            },
            backgroundColor: {
                skin: {
                    fill: colors.gray[800],
                    menu: colors.gray[700],
                },
            },
            textColor: {
                skin: {
                    base: colors.gray[200],
                    muted: colors.gray[900],
                },
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".center": {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                },
            });
        }),
    ],
};
