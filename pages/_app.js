import React from "react";
import Header from "../components/Header";
import useIsKeyDown from "../lib/useIsKeyDown";
import "../styles/globals.css";

export const Global = React.createContext();

function MyApp({ Component, pageProps }) {
    const shiftPressed = useIsKeyDown("Shift");

    return (
        <div className="grid h-screen grid-rows-[auto_1fr] bg-black">
            <Header />
            <div className="container mx-auto">
                <Global.Provider value={{ shiftPressed }}>
                    <Component {...pageProps} />
                </Global.Provider>
            </div>
        </div>
    );
}

export default MyApp;
