module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        fontFamily: {
            report: ["Montserrat", "Noto Sans KR", "sans-serif"],
        },
        fontWeight: {
            thin: "100",
            extralight: "200",
            light: "300",
            normal: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
            extrabold: "800",
            black: "900",
        },
        letterSpacing: {
            tightest: "-0.1px",
            extratight: "-0.3px",
        },
        colors: {
            ...require("tailwindcss/colors"),
            orange: "#DEA162",
            blackText: {
                200: "#000000",
                100: "#575757"
            },
            secondary: {
                200: "#FFDAC1",
                100: "#FF6600"
            },
            gray: {
                900: "#222222",
                800: "#222222",
                700: "#757575",
                600: "#A5A5A5",
                500: "#B3B3B3",
                400: "#BDBDBD",
                300: "#DEDEDE",
                200: "#E0E0E0",
                100: "#606577",
                50: "#FAFAFA",
                60: "#BEC0C4",
                90: "#EEF0F5"
            },
            main: {
                900: "#001C4D",
                800: "#002461",
                700: "#002B75",
                600: "#163666",
                500: "#00497D",
                400: "#0A49AD",
                300: "#0056A5",
                200: "#D0E3FF",
                100: "#EEF5FA",
                50: "#F8FAFE",
            },
            accent: {
                100: "#00F0FF",
                200: "#FFD600",
                300: "#FFF4E4"
            },
            blue: {
                10: "#EDF5FF",
                20: "#DDE2F5",
                100: "#335FF0",
                500: "#3B82F6",
                600: "#2563EB",
                700: "#0056A5",

            },
            invisible: "rgba(0,0,0,0)",
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
        extend: {
            borderWidth: {
                1: "1px",
            },
        },
    },
    daisyui: {
        themes: [
            {
                hbrc: {
                    ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                    "base-100": "#FAFAFA",
                    "base-200": "#EEEEEE",
                    "base-300": "#E0E0E0",
                    "base-content": "#424242",
                    primary: "#0A49AD",
                    "primary-content": "white",
                    "primary-focus": "#0A49AD",
                    "--hbrc-border": "#EEEEEE",
                    secondary: "#FF6600",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
}
