import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ProductCard = ({ product, shop }) => {
    return (
        <Link
            href={shop.shopUrl + product.productUrl.substring(1)}
            passHref={true}
        >
            <motion.a
                className="group relative flex w-full cursor-pointer flex-col gap-4 p-5 px-12 pt-10 shadow-md shadow-black md:w-72"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: "0%" }}
                target="_blank"
            >
                {/* Logo */}
                <img
                    className="absolute left-0 top-0 w-8 rounded-sm"
                    src={shop.logoUrl}
                />
                <div className="grid grid-cols-[auto_1fr] flex-col gap-3 md:flex md:gap-2">
                    {/* Name */}
                    <p
                        className="card-header col-start-2 h-[74px] justify-self-start pb-5 font-medium"
                        title={product.name}
                    >
                        {product.name}
                    </p>
                    {/* Product Image */}
                    <div className="col-start-1 row-start-1 flex aspect-square w-32 justify-center self-center overflow-hidden bg-white md:order-none md:w-44">
                        <img
                            className="h-full w-full transition-transform duration-1000 group-hover:scale-125"
                            src={product.imgUrl}
                        />
                    </div>
                </div>
                {/* Category */}
                <p className="absolute bottom-2 left-3  capitalize text-gray-400">
                    {product.categoryId}
                </p>
                {/* Price */}
                <p className="-mr-6 self-end rounded-full bg-red-500 p-2 px-4 text-sm font-medium">
                    {product.price + " €"}
                </p>
            </motion.a>
        </Link>
    );
};
export default ProductCard;
