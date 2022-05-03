import React, { useState } from "react";
import Sort from "./Sort";
import Input from "./Input";
import { motion } from "framer-motion";
import ShopFilters from "./ShopFilters";
import CategoryFilters from "./CategoryFilters";
import MobileFilter from "./MobileFilter";
import useFilter from "../lib/useFilter";

export function Controls({ isSearch, shops, searchInfo }) {
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
        <motion.div className="relative z-10 mt-10 grid w-full grid-cols-[1fr_auto] gap-2 md:px-10">
            <Input
                className="sticky top-0 z-50 col-span-2 bg-skin-fill"
                placeholder="Search Product"
            />
            {isSearch && (
                <>
                    <ShopFilters
                        className={
                            "hidden gap-1 self-start overflow-x-auto no-scrollbar md:flex"
                        }
                        {...shopFiltersProps}
                    />
                    <CategoryFilters
                        className={
                            "col-span-2 hidden gap-1 self-start overflow-x-auto no-scrollbar md:flex"
                        }
                        {...categoryFiltersProps}
                    />
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
}
