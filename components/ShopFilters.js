import { useRef } from "react";
import useFilter from "../lib/useFilter";
import useSideScroll from "../lib/useSideScroll";
import { classNames } from "../lib/utils";
import FilterBtn from "./FilterBtn";

const ShopFilters = ({
    searchInfo,
    shops,
    className,
    toggleBtn,
    handleShiftClick,
    selectAll,
    excludeArr,
}) => {
    const scrollContainerRef = useRef();
    useSideScroll(scrollContainerRef);

    const filterBtnClasses = (isActive) =>
        `cursor-pointer select-none whitespace-nowrap rounded-full px-4 py-1 text-sm capitalize transition-colors duration-200 focus-visible:outline-none disabled:cursor-default disabled:bg-gray-600 disabled:text-gray-400  ${
            isActive ? "bg-primary hover:bg-primary-highlight" : "bg-gray-500"
        }`;

    function getCountShop(id) {
        return (
            searchInfo.shopCounts.find((info) => info.shopId === id)?.count ?? 0
        );
    }

    return (
        <div ref={scrollContainerRef} className={className}>
            <FilterBtn
                shopId="Select All"
                className={filterBtnClasses(excludeArr.length === 0)}
                onClick={selectAll}
                count={searchInfo.shopCounts
                    .map((x) => x.count)
                    .reduce((x, y) => x + y, 0)}
            />
            {shops
                .sort((a, b) => getCountShop(b.shopId) - getCountShop(a.shopId))
                .map((shop) => (
                    <FilterBtn
                        key={shop.shopId}
                        className={filterBtnClasses(
                            !excludeArr.includes(shop.shopId)
                        )}
                        shopId={shop.shopId}
                        count={getCountShop(shop.shopId)}
                        onClick={toggleBtn}
                        onShiftClick={handleShiftClick}
                        disabled={!getCountShop(shop.shopId)}
                    />
                ))}
        </div>
    );
};

export default ShopFilters;
