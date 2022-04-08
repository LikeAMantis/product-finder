import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const [excludeShops, setExcludeShops] = useLocalStorage("excludeShops", []);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [searchInfo, setSearchInfo] = useState([]);

    async function getSearchInfo() {
        const data = await fetch(
            `api/search-info?search=${router.query.search}`
        ).then((res) => res.json());
        setSearchInfo(data);
    }

    function toggleShop(shopId) {
        var newExcludeShops;
        if (excludeShops.indexOf(shopId) === -1) {
            newExcludeShops = [...excludeShops, shopId];
        } else {
            newExcludeShops = excludeShops.filter((x) => x !== shopId);
        }

        setExcludeShops(newExcludeShops);
        router.push({
            query: {
                ...router.query,
                excludeShops: newExcludeShops.join(","),
            },
        });
    }

    useEffect(() => {
        async function getShops() {
            const res = await fetch("api/shops");
            const data = await res.json();
            setShops(data);
        }

        getShops();
    }, []);

    useEffect(() => {
        // setIsLoading(true);

        setTimeout(() => {
            getProducts();
            getSearchInfo();
            setIsLoading(false);
        }, 0);
    }, [router]);

    async function getProducts() {
        const res = await fetch(`api/products/${router.asPath}`);
        if (res.status === 404) {
            return;
        }
        const data = await res.json();

        setProducts(data);
    }

    return {
        isLoading,
        shops,
        toggleShop,
        products,
        searchInfo,
        excludeShops,
    };
};
export default useProducts;
