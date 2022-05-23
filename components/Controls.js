import React, { forwardRef, useEffect, useRef, useState } from "react";
import Sort from "./Sort";
import Input from "./Input";
import { motion } from "framer-motion";
import ShopFilters from "./ShopFilters";
import CategoryFilters from "./CategoryFilters";
import MobileFilter from "./MobileFilter";
import useFilter from "../lib/useFilter";

export const Controls = forwardRef(({ isSearch, shops, searchInfo }, ref) => {
    const shopFilters = useFilter({
        saveToLocalStorage: true,
        type: "excludeShops",
        itemsIds: shops.map((x) => x.shopId),
    });
    const shopFiltersProps = { ...shopFilters, shops, searchInfo };

    const [cachedCategories, setCachedCategories] = useState(
        searchInfo.categories
    );
    const categoryFilters = useFilter({
        type: "excludeCategories",
        itemsIds: cachedCategories.map((x) => x.categoryId),
    });
    const categoryFiltersProps = {
        ...categoryFilters,
        cachedCategories,
        setCachedCategories,
        searchInfo,
    };

    return (
        <motion.div
            role="heading"
            className="container mx-auto grid w-full grid-cols-[1fr_auto] gap-2 bg-skin-fill py-2 shadow-black"
            ref={ref}
        >
            <Input className="col-span-2" placeholder="Search Product" />
            {isSearch && (
                <>
                    <div className="relative hidden overflow-hidden md:block">
                        <ShopFilters
                            className={
                                "flex gap-1 self-start overflow-x-auto no-scrollbar"
                            }
                            {...shopFiltersProps}
                        />
                    </div>
                    <div className="relative col-span-2 hidden overflow-hidden md:flex">
                        <CategoryFilters
                            className={
                                "gap-1 overflow-x-auto no-scrollbar md:flex"
                            }
                            {...categoryFiltersProps}
                        />
                    </div>
                    <MobileFilter
                        className={
                            "w-min text-skin-base hover:text-gray-500 md:hidden"
                        }
                    >
                        <div className="space-y-8 divide-y-2 divide-black">
                            <div class="gap-1 space-y-2">
                                <h2>Shops</h2>
                                <ShopFilters
                                    className="flex flex-col justify-center gap-1"
                                    {...shopFiltersProps}
                                />
                            </div>
                            <div class="gap-1 space-y-2">
                                <h2>Categories</h2>
                                <CategoryFilters
                                    className="flex flex-col justify-center gap-1"
                                    {...categoryFiltersProps}
                                />
                            </div>
                        </div>
                    </MobileFilter>
                </>
            )}
            <Sort className="col-start-2 row-start-2 justify-self-end" />
        </motion.div>
    );
});
