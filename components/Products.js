import { RefreshIcon } from "@heroicons/react/solid";
import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useRef } from "react";
import { useFirstMountState } from "react-use";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const Products = ({ products, shops, isLoading }) => {
    const isFirstSearch = useRef(false);

    function productCards() {
        return products.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
                logoUrl={
                    shops.find((shop) => shop.name === product.shop)?.logoUrl
                }
            />
        ));
    }

    function loadingAnimation() {
        return (
            <motion.div
                initial={{
                    rotate: "0deg",
                    origin: "center",
                }}
                animate={{
                    rotate: "360deg",
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    rotate: {
                        repeat: Infinity,
                        type: "tween",
                        duration: 1.5,
                    },
                    scale: { type: "spring" },
                }}
                className="h-min"
            >
                <RefreshIcon className="w-28" />
            </motion.div>
        );
    }

    return (
        <LayoutGroup>
            <motion.div
                className={`relative flex h-full flex-wrap justify-center gap-4 py-10 ${
                    isLoading ? "items-center" : "items-start"
                }`}
                transition={{ duration: 0.3 }}
            >
                {products.length > 0 && !isLoading
                    ? productCards()
                    : isLoading
                    ? loadingAnimation()
                    : isFirstSearch.current && (
                          <p className="text-lg font-bold">Nothing Found :/</p>
                      )}
            </motion.div>
            {products.length > 0 && <Pagination />}
        </LayoutGroup>
    );
};

export default Products;
