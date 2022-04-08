import { useState } from "react";
import Input from "../components/Input";
import Products from "../components/Products";
import Sort from "../components/Sort";
import ToggleFilter from "../components/ToggleFilter";
import useProducts from "../lib/useProducts";

const Home = () => {
    const { isLoading, shops, toggleShop, excludeShops, products, searchInfo } =
        useProducts();

    return (
        <div className="flex h-full flex-col items-center gap-2 overflow-auto bg-skin-fill text-skin-base">
            <div className="z-10 grid w-[80%] max-w-xl grid-cols-2 gap-2">
                <Input className="col-span-2" placeholder="Search Product" />
                <ToggleFilter
                    className="self-start"
                    toggleShop={toggleShop}
                    excludeShops={excludeShops}
                    searchInfo={searchInfo}
                />
                <Sort className="justify-self-end" />
            </div>
            <Products products={products} shops={shops} isLoading={isLoading} />
        </div>
    );
};

export default Home;
