import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useSideScroll from "../lib/useSideScroll";
import FilterBtn from "./FilterBtn";

const CategoryFilters = ({
    searchInfo,
    className,
    toggleBtn,
    handleShiftClick,
    selectAll,
    excludeArr,
    cachedCategories,
    setCachedCategories,
}) => {
    const scrollContainerRef = useRef();
    useSideScroll(scrollContainerRef);

    const prevSearch = useRef("");
    const router = useRouter();

    useEffect(() => {
        const search = router.query.search;
        const isNewSearch = search !== prevSearch.current;
        if (isNewSearch) {
            setCachedCategories(searchInfo.categories);
            prevSearch.current = search;
        }
    }, [searchInfo]);

    const filterBtnClasses = (isActive) =>
        `cursor-pointer border-[3px] select-none whitespace-nowrap rounded-full px-2 text-sm capitalize transition-colors duration-200 focus-visible:outline-none disabled:cursor-default disabled:border-gray-700 disabled:text-gray-500  ${
            isActive
                ? "border-red-500 text-red-500 hover:border-red-400 hover:text-red-400"
                : "border-gray-500 text-gray-500"
        }`;

    return (
        <div ref={scrollContainerRef} className={className}>
            <FilterBtn
                shopId="Select All"
                className={filterBtnClasses(excludeArr.length === 0)}
                onClick={selectAll}
            />
            {cachedCategories.map(({ categoryId }) => (
                <FilterBtn
                    key={categoryId}
                    className={filterBtnClasses(
                        !excludeArr.includes(categoryId)
                    )}
                    shopId={categoryId}
                    isActive={!excludeArr.includes(categoryId)}
                    onClick={toggleBtn}
                    onShiftClick={handleShiftClick}
                    // count={
                    //     searchInfo.categories.find(
                    //         (x) =>
                    //             x.categoryId ===
                    //             categoryId
                    //     )?.count ?? 0
                    // }
                />
            ))}
        </div>
    );
};
export default CategoryFilters;
