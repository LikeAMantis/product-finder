const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const gray = colors.gray;

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray,
                primary: colors.blue[500],
                "primary-highlight": colors.blue[400],
            },
            backgroundColor: {
                skin: {
                    gray,
                    fill: colors.gray[800],
                    menu: colors.gray[900],
                },
            },
            textColor: {
                skin: {
                    gray,
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
                ".no-scrollbar::-webkit-scrollbar": {
                    display: "none",
                },
                ".no-scrollbar": {
                    "-ms-overflow-style": "none" /* IE and Edge */,
                    "scrollbar-width": "none" /* Firefox */,
                },
            });
        }),
    ],
};
