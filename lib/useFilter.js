import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

const useFilter = ({ saveToLocalStorage = false, type, itemsIds }) => {
    const [excludeArr, setExcludeArr] = saveToLocalStorage
        ? useLocalStorage(type, [])
        : useState([]);
    const router = useRouter();

    useEffect(() => {
        const query = router.query[type];
        if (query) {
            setExcludeArr(query.split(","));
        }
    }, []);

    function toggleBtn(shopId) {
        if (excludeArr.indexOf(shopId) === -1) {
            pushToQuery([...excludeArr, shopId]);
            return;
        }
        pushToQuery(excludeArr.filter((x) => x !== shopId));
    }

    function handleShiftClick(id) {
        pushToQuery(itemsIds.filter((item) => item !== id));
    }

    function pushToQuery(newItems) {
        setExcludeArr(newItems);
        const push = {
            query: {
                ...router.query,
                page: 1,
            },
        };
        push.query[type] = newItems.join(",");
        router.push(push);
    }

    function selectAll() {
        setExcludeArr([]);
        pushToQuery([]);
    }

    return { toggleBtn, handleShiftClick, selectAll, excludeArr };
};
export default useFilter;
