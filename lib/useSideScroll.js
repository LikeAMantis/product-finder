import { useEffect } from "react";

const useSideScroll = (ref) => {
    useEffect(() => {
        ref.current.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            ref.current.scrollLeft += evt.deltaY;
        });

        // return () => {
        //     ref.current.removeEventListener("wheel");
        // };
    }, []);
};
export default useSideScroll;
