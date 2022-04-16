import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import Input from "../components/Input";
import Products from "../components/Products";
import Sort from "../components/Sort";
import ToggleFilter from "../components/ToggleFilter";
import useProducts from "../lib/useProducts";

const Home = ({ test }) => {
    const { isLoading, shops, products, searchInfo, limit } = useProducts();
    const [excludeShops, setExcludeShops] = useLocalStorage("excludeShops", []);

    useEffect(() => {
        console.log(test);
    }, []);

    return (
        <div className="flex h-full flex-col items-center gap-2 overflow-auto bg-skin-fill text-skin-base">
            <div className="top-1/2 z-10 grid w-[80%] max-w-xl grid-cols-2 gap-2">
                <Input className="col-span-2" placeholder="Search Product" />
                <ToggleFilter
                    className="self-start"
                    searchInfo={searchInfo}
                    excludeShops={excludeShops}
                    setExcludeShops={setExcludeShops}
                />
                <Sort className="justify-self-end" />
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
