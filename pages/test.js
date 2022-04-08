import { useCallback, useEffect, useState } from "react";

const Test = () => {
    const [count, setCount] = useState(0);
    const [test, setTest] = useState(true);
    const [toggle, setToggle] = useState(true);

    const Child = useCallback((props) => {
        useEffect(() => {
            console.log("Child rerenderd" + props.count);
        });

        return <div>Child: {}</div>;
    }, []);

    const bla = () => {
        return <div>toggletoggletoggle </div>;
    };

    return (
        <div className="text-skin-base">
            <p>count: {count}</p>
            <button onClick={() => setCount(++count)}>Increase</button>
            {test && <Child count={count} />}
            {bla()}
            <button onClick={() => setToggle(!toggle)}>toggle</button>
        </div>
    );
};
export default Test;
