import React from "react";
import useIsKeyDown from "../lib/useIsKeyDown";
import "../styles/globals.css";

export const Global = React.createContext();

function MyApp({ Component, pageProps }) {
    const shiftPressed = useIsKeyDown("Shift");

    return (
        <Global.Provider value={{ shiftPressed }}>
            <Component {...pageProps} />
        </Global.Provider>
    );
}

export default MyApp;
