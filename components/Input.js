import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { classNames } from "../lib/utils";
import Alert from "./Alert";
import { Transition } from "@headlessui/react";

const Input = ({ placeholder, className }) => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [items, setItems] = useState([]);

    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        const search = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        }).search;

        if (!search) return;

        setValue(search);
    }, []);

    useEffect(() => {
        if (!showAlert) return;

        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showAlert]);

    useDebounce(
        () => {
            if (!value) return;

            async function getItems() {
                const data = await fetch(
                    `/api/products?search=${value}&limit=6`
                ).then((res) => res.json());
                setItems(data);
            }
            getItems();
        },
        250,
        [value]
    );

    function popup() {
        if (items.length > 0) {
            return items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                    <img className="aspect-square w-8" src={item.imgUrl} />
                    <p className="truncate">{item.name}</p>
                </div>
            ));
        }
        return <p>nothing found.</p>;
    }

    return (
        <div className={classNames("relative w-full", className)}>
            <input
                className="peer relative mt-4 w-full border-b border-gray-400 bg-transparent px-1 text-lg text-skin-base outline-none"
                placeholder=" "
                type="search"
                role="search"
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                onKeyDown={(e) => {
                    if (items.length == 0) return;

                    if (e.key === "Enter") {
                        if (value.length == 0) {
                            setShowAlert(true);
                            return;
                        }
                        router.push({
                            query: {
                                ...router.query,
                                search: value,
                                page: 1,
                            },
                        });
                        e.target.blur();
                    }
                }}
            />
            <p className="pointer-events-none absolute top-0.5 px-1 text-xs text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                {placeholder}
            </p>
            <div className="relative -top-px w-full origin-center scale-x-0 border-b border-primary-highlight transition-all duration-200 peer-focus:scale-x-100"></div>
            <AnimatePresence>
                {showAlert && <Alert text="Need at least 1 Character!" />}
            </AnimatePresence>
            {/* <Portal> */}
            <Transition
                as={Fragment}
                show={hasFocus && value.length > 0}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute z-40 w-full space-y-2 rounded-lg bg-skin-menu p-5 text-skin-base shadow-lg shadow-black">
                    {popup()}
                </div>
            </Transition>
            {/* </Portal> */}
        </div>
    );
};
export default Input;
