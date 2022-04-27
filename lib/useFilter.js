import { useLocalStorage } from "react-use";

const useFilter = () => {
    const [excludeShops, setExcludeShops] = useLocalStorage("excludeShops", []);
    const [excludeCategories, setExcludeCategories] = useLocalStorage(
        "excludeCategories",
        []
    );

    return {
        excludeShops,
        setExcludeShops,
        excludeCategories,
        setExcludeCategories,
    };
};
export default useFilter;
