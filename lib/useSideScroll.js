import { useEffect } from "react";

const useSideScroll = (ref, speed = 1) => {
    useEffect(() => {
        ref.current.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            ref.current.scrollLeft += evt.deltaY * speed;
        });
    }, []);
};
export default useSideScroll;
