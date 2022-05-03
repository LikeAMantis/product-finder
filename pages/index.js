import { Controls } from "../components/Controls";
import { useRouter } from "next/router";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import useFilter from "../lib/useFilter";
import useProducts from "../lib/useProducts";
import { useEffect, useRef } from "react";
import Header from "../components/Header";

const Home = () => {
    const { isLoading, shops, products, searchInfo, limit } = useProducts();

    const router = useRouter();
    const ref = useRef();

    const isSearch = router.query.search?.length > 0;

    useEffect(() => {
        ref.current.scroll(0, 0);
    }, [router]);

    return (
        <div className="flex h-screen flex-col justify-between overflow-x-hidden text-skin-base">
            <div ref={ref} className="overflow-y-auto overflow-x-hidden">
                <Header />
                <div className="container mx-auto flex flex-col items-center px-6 md:px-0">
                    <Controls
                        isSearch={isSearch}
                        searchInfo={searchInfo}
                        shops={shops}
                    />
                    <Products
                        products={products}
                        shops={shops}
                        isLoading={isLoading}
                        isProducts={searchInfo.shopCounts.length > 0}
                    />
                </div>
            </div>
            {products.length > 0 && (
                <Pagination
                    results={searchInfo.categories
                        .map((x) => x.count)
                        .reduce((x, y) => x + y, 0)}
                    limit={limit}
                />
            )}
        </div>
    );
};

export async function getServerSideProps() {
    return { props: { test: "hello from serverSideProps" } };
}

export default Home;
