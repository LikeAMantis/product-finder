import { useRouter } from "next/router";
import { Children, cloneElement, useEffect, useRef } from "react";
import useSideScroll from "../lib/useSideScroll";
import { classNames } from "../lib/utils";

const ToggleFilter = ({
    className,
    type,
    excludeArr,
    setItems,
    children,
    itemsIds,
}) => {
    const router = useRouter();
    const ref = useRef();

    useSideScroll(ref);

    useEffect(() => {
        const query = router.query[type];
        if (query) {
            setItems(query.split(","));
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
        setItems(newItems);
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
        setItems([]);
        pushToQuery([]);
    }

    return (
        <div ref={ref} className={className}>
            {typeof children == "function"
                ? children({
                      toggleBtn,
                      handleShiftClick,
                      selectAll,
                      excludeArr,
                  })
                : children}
        </div>
    );
};

export default ToggleFilter;
