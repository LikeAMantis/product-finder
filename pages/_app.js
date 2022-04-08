import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="grid h-screen grid-rows-[auto_1fr] bg-black">
            <Header />
            <div className="container mx-auto">
                <Component {...pageProps} />
            </div>
        </div>
    );
}

export default MyApp;
