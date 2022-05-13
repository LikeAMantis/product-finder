import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
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
    const { leftIndicator, rightIndicator } = useSideScroll(
        scrollContainerRef,
        cachedCategories
    );

    const prevSearch = useRef("");
    const router = useRouter();

    useEffect(() => {
        if (searchInfo.categories.length == 0) return;
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
            {leftIndicator && (
                <div className="absolute left-0 flex h-full w-8 items-center bg-gradient-to-r from-gray-800 to-transparent">
                    <ArrowLeftIcon className="h-4 w-4" />
                </div>
            )}
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
            {rightIndicator && (
                <div className="absolute top-0 right-0 flex h-full w-8 items-center justify-end bg-gradient-to-l from-gray-800 to-transparent">
                    <ArrowRightIcon className="h-4 w-4" />
                </div>
            )}
        </div>
    );
};
export default CategoryFilters;
