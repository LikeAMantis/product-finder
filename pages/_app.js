import Header from "../components/header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="grid h-screen grid-rows-[auto_1fr]">
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
