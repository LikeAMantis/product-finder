import { RefreshIcon } from "@heroicons/react/solid";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useRef } from "react";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const Products = ({ products, shops, isLoading, isProducts }) => {
    const isFirstSearch = useRef(false);
    const router = useRouter();

    function productCards() {
        return (
            <AnimatePresence>
                {products.map((product) => (
                    <ProductCard
                        key={product.productId}
                        product={product}
                        shop={shops.find(
                            (shop) => shop.shopId === product.shopId
                        )}
                    />
                ))}
            </AnimatePresence>
        );
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
        <motion.div
            className={`container relative flex h-full flex-wrap justify-center gap-4 py-10 md:gap-y-12 ${
                isLoading ? "items-center" : "items-start"
            }`}
        >
            {!isLoading ? productCards() : loadingAnimation()}
            {!isProducts && router.query.search && (
                <p className="text-xl">{"Nothing found :("}</p>
            )}
            {isProducts && products.length === 0 && (
                <p className="text-xl">Activate filters to show products!</p>
            )}
        </motion.div>
    );
};

export default Products;
