import { useMemo, useState } from "react";
import { createGlobalState } from "react-use";

const useGlobalExclude = createGlobalState("spar");
const myObj = { a: 3 };

const useTest = () => {
    const [exclude, setExclude] = useGlobalExclude();
    const [sort, setSort] = useState("price");

    const config = useMemo(
        () => ({ exclude, setExclude, sort, setSort }),
        [exclude, sort]
    );
    return { config, myObj };
};
export default useTest;
