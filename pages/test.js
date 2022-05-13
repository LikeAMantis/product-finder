import { useEffect, useRef, useState } from "react";
import { useEvent } from "react-use";

const Test = () => {
    const [leftIndicator, setLeftIndicator] = useState(false);
    const [rightIndicator, setrightIndicator] = useState(true);
    const ref = useRef();
    const containerRef = useRef();

    useEffect(() => {
        const cachedRef = ref.current,
            observer = new IntersectionObserver(([e]) => console.log(e), {
                root: containerRef.current,
                threshold: [0.9],
            });
        observer.observe(cachedRef);

        return function () {
            observer.unobserve(cachedRef);
        };
    }, []);

    return (
        <div className="grid-rows-[200px_1fr] bg-gray-800  text-skin-base">
            <div
                ref={containerRef}
                className="w-1/2 overflow-hidden bg-green-300"
            >
                <div
                    ref={ref}
                    className="overflow-x-scroll whitespace-nowrap bg-blue-300 p-5"
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Suscipit voluptate perferendis iusto hic quia nostrum
                    molestias numquam? Expedita libero saepe iste dolores.
                    Veritatis perspiciatis quos natus totam accusamus minima
                    alias soluta, aperiam fugiat iste eos atque enim esse harum
                    incidunt? Similique test, suscipit aperiam commodi cumque
                    repellendus ad tenetur dolore.
                </div>
            </div>
        </div>
    );
};
export default Test;
