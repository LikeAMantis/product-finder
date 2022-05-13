import { useEffect, useLayoutEffect, useState } from "react";
import { useEvent } from "react-use";

const useSideScroll = (ref, items, speed = 1) => {
    const [leftIndicator, setLeftIndicator] = useState(false);
    const [rightIndicator, setrightIndicator] = useState(false);

    useEffect(() => {
        setrightIndicator(ref.current.scrollWidth > ref.current.offsetWidth);
    }, [items]);
    useEvent("resize", () =>
        setrightIndicator(ref.current.scrollWidth > ref.current.offsetWidth)
    );
    useEvent(
        "scroll",
        (e) => {
            const target = e.target;

            setrightIndicator(
                !(
                    target.offsetWidth + target.scrollLeft + 1 >=
                    target.scrollWidth
                )
            );
            setLeftIndicator(target.scrollLeft > 0);
        },
        ref.current
    );

    useEvent(
        "wheel",
        (e) => {
            e.preventDefault();
            ref.current.scrollLeft += e.deltaY * speed;
        },
        ref.current
    );

    function setIndicators() {}

    return { leftIndicator, rightIndicator };
};
export default useSideScroll;
