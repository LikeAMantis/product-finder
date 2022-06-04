import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [shops, setShops] = useState(false);
    const [searchInfo, setSearchInfo] = useState({
        shopCounts: [],
        categories: [],
    });
    const limit = 30;

    useEffect(() => {
        async function getShops() {
            const res = await fetch("api/shops");
            const data = await res.json();
            setShops(data);
        }

        getShops();
    }, []);

    useEffect(() => {
        const search = router.query.search;
        if (!search) return;

        async function routerUpdate() {
            // setIsLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            // setIsLoading(false);
            getSearchInfo();
            getProducts();
        }

        routerUpdate();
    }, [router]);

    async function getProducts() {
        const asPath = router.asPath + `&limit=${limit}`;

        const res = await fetch(`api/products/${asPath}`);
        if (res.status === 404) {
            return;
        }
        const data = await res.json();

        setProducts(data);
    }

    async function getSearchInfo() {
        const data = await fetch(`api/search-info/${router.asPath}`).then(
            (res) => res.json()
        );
        setSearchInfo(data);
    }

    return {
        isLoading,
        products,
        searchInfo,
        limit,
        shops,
    };
};
export default useProducts;
