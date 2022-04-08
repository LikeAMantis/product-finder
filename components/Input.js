import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classNames } from "../lib/utils";
import Alert from "./Alert";

const Input = ({ placeholder, className }) => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!showAlert) return;

        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showAlert]);

    return (
        <div className={classNames("relative mt-10 w-full", className)}>
            <input
                className="peer mt-4 w-full border-b border-gray-400 bg-transparent px-1 text-skin-base outline-none"
                placeholder=" "
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                onKeyDown={({ key }) => {
                    if (key === "Enter") {
                        if (value.length < 1) {
                            setShowAlert(true);
                            return;
                        }
                        router.push({
                            query: {
                                ...router.query,
                                search: value,
                            },
                        });
                    }
                }}
            />
            <p className="pointer-events-none absolute top-0.5 px-1 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                {placeholder}
            </p>
            <div className="relative -top-px w-full origin-center scale-x-0 border-b border-primary-highlight transition-all duration-200 peer-focus:scale-x-100"></div>
            {/* Error */}
            <AnimatePresence>
                {showAlert && <Alert text="Need at least 1 Character!" />}
            </AnimatePresence>
        </div>
    );
};
export default Input;
