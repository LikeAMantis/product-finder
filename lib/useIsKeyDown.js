import { useState } from "react";
import { useKeyPressEvent } from "react-use";

const useIsKeyDown = (key) => {
    const [keyPressed, setKeyPressed] = useState(false);
    useKeyPressEvent(
        key,
        () => setKeyPressed(true),
        () => setKeyPressed(false)
    );

    return keyPressed;
};
export default useIsKeyDown;
