import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import FilterBtn from "../components/FilterBtn";
import Input from "../components/Input";
import Products from "../components/Products";
import Sort from "../components/Sort";
import ToggleFilter from "../components/ToggleFilter";
import useFilter from "../lib/useFilter";
import useProducts from "../lib/useProducts";
import { classNames } from "../lib/utils";

const Home = ({ test }) => {
    const { isLoading, shops, products, searchInfo, limit, categories } =
        useProducts();
    const {
        excludeShops,
        setExcludeShops,
        excludeCategories,
        setExcludeCategories,
    } = useFilter();

    function getCountShop(id) {
        return searchInfo.find((info) => info.shopId === id)?.count;
    }

    // const availableCategories = [
    //     "brot & gebäck",
    //     "fleisch, wurst & fisch",
    //     "getränke",
    //     "haushalt",
    //     // "obst & gemüse",
    //     // "süßes & salziges",
    //     // "tiefkühl",
    //     // "haustier",
    //     // "pflege",
    //     // "kühlwaren",
    //     // "grundnahrunsmittel",
    //     // "sonstiges",
    // ];
    // const availableCategories = [...new Set(products.map((x) => x.categoryId))];
    const availableCategories = categories.map((x) => x.categoryId);

    return (
        <div className="flex h-full flex-col items-center gap-2 overflow-hidden text-skin-base">
            <div className="top-1/2 z-10 grid w-[80%] max-w-xl grid-cols-[1fr_auto] gap-2">
                <Input className="col-span-2" placeholder="Search Product" />
                <ToggleFilter
                    className="no-scrollbar row-start-2 flex gap-1 self-start overflow-x-auto"
                    type="excludeShops"
                    excludeArr={excludeShops}
                    setItems={setExcludeShops}
                    itemsIds={shops.map((x) => x.shopId)}
                >
                    {({
                        toggleBtn,
                        handleShiftClick,
                        excludeArr,
                        selectAll,
                    }) => {
                        const className = (isActive) =>
                            `cursor-pointer select-none whitespace-nowrap rounded-full px-4 py-1 text-sm capitalize transition-colors duration-200 focus-visible:outline-none disabled:cursor-default disabled:bg-gray-700 disabled:text-gray-500  ${
                                isActive
                                    ? "bg-primary hover:bg-primary-highlight"
                                    : "bg-gray-500"
                            }`;

                        return (
                            <>
                                <FilterBtn
                                    shopId="Select All"
                                    className={className(
                                        excludeArr.length === 0
                                    )}
                                    onClick={selectAll}
                                    count={searchInfo
                                        .map((x) => x.count)
                                        .reduce((x, y) => x + y, 0)}
                                />
                                {shops.map((shop) => (
                                    <FilterBtn
                                        key={shop.shopId}
                                        className={className(
                                            !excludeArr.includes(shop.shopId)
                                        )}
                                        shopId={shop.shopId}
                                        count={getCountShop(shop.shopId)}
                                        onClick={toggleBtn}
                                        onShiftClick={handleShiftClick}
                                        disabled={!getCountShop(shop.shopId)}
                                    />
                                ))}
                            </>
                        );
                    }}
                </ToggleFilter>
                <ToggleFilter
                    className="no-scrollbar col-span-2 row-start-3 flex gap-1 self-start overflow-x-auto"
                    type="excludeCategories"
                    excludeArr={excludeCategories}
                    setItems={setExcludeCategories}
                    itemsIds={availableCategories}
                >
                    {({
                        toggleBtn,
                        handleShiftClick,
                        excludeArr,
                        selectAll,
                    }) => {
                        const className = (isActive) =>
                            `cursor-pointer border-[3px] select-none whitespace-nowrap rounded-full px-2 text-sm capitalize transition-colors duration-200 focus-visible:outline-none disabled:cursor-default disabled:bg-gray-700 disabled:text-gray-500  ${
                                isActive
                                    ? "border-red-500 text-red-500 hover:border-red-400 hover:text-red-400"
                                    : "border-gray-500 text-gray-500"
                            }`;

                        return (
                            <>
                                <FilterBtn
                                    shopId="Select All"
                                    className={className(
                                        excludeArr.length === 0
                                    )}
                                    onClick={selectAll}
                                />
                                {availableCategories.map((categoryId) => (
                                    <FilterBtn
                                        key={categoryId}
                                        className={className(
                                            !excludeArr.includes(categoryId)
                                        )}
                                        shopId={categoryId}
                                        isActive={
                                            !excludeArr.includes(categoryId)
                                        }
                                        onClick={toggleBtn}
                                        onShiftClick={handleShiftClick}
                                    />
                                ))}
                            </>
                        );
                    }}
                </ToggleFilter>
                <Sort className="col-start-2 col-end-3 justify-self-end" />
            </div>
            <Products
                products={products}
                shops={shops}
                isLoading={isLoading}
                results={searchInfo
                    .filter((x) => !excludeShops.includes(x.shop))
                    .map((x) => x.count)
                    .reduce((x, y) => x + y, 0)}
                limit={limit}
            />
        </div>
    );
};

// export async function getServerSideProps() {
//     return { props: { test: "hello from serverSideProps" } };
// }

export default Home;
