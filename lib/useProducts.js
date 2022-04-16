import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [searchInfo, setSearchInfo] = useState([]);
    const limit = 4;

    useEffect(() => {
        async function getShops() {
            const res = await fetch("api/shops");
            const data = await res.json();
            setShops(data);
        }

        getShops();
    }, []);

    useEffect(() => {
        if (!router.query.search) return;

        // setIsLoading(true);
        getProducts();
        getSearchInfo();
        // setIsLoading(false);
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
        const data = await fetch(
            `api/search-info?search=${router.query.search}`
        ).then((res) => res.json());
        setSearchInfo(data);
    }

    return {
        isLoading,
        shops,
        products,
        searchInfo,
        limit,
    };
};
export default useProducts;
