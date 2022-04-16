import { useCallback, useEffect, useState, useReducer } from "react";
import useTest from "../lib/useTest";

// const Component = ;

const Test = () => {
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        console.log("effect");
    }, []);

    function test() {
        if (toggle)
            return (
                <div>
                    <p>Yes</p>
                    Hello
                </div>
            );
        return (
            <div>
                Hello
                <p>Yes</p>
            </div>
        );
    }

    return (
        <div>
            <div className="text-skin-base">
                {test()}
                <button
                    onClick={() => {
                        setToggle(!toggle);
                    }}
                >
                    pressme
                </button>
            </div>
        </div>
    );
};
export default Test;
