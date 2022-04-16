import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ProductCard = ({ product, shop }) => {
    return (
        <Link href={shop.shopUrl + product.productUrl} passHref={true}>
            <motion.a
                className="group relative flex h-min w-[90%] cursor-pointer flex-col gap-4 p-5 px-12 pt-10 shadow-md shadow-black md:w-64"
                target="_blank"
                // layout="position"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                // transition={{ opacity: { duration: 0.5 } }}
            >
                {/* Logo */}
                <img
                    className="absolute left-0 top-0 w-8 rounded-sm"
                    src={shop.logoUrl}
                ></img>
                {/* Name */}
                <p
                    className="card-header h-[74px] pb-5 font-medium"
                    title={product.name}
                >
                    {product.name}
                </p>
                {/* Product Image */}
                <div className="flex w-44 justify-center self-center overflow-hidden bg-white">
                    <img
                        className="transition-transform duration-1000 group-hover:scale-125 "
                        src={product.imgUrl}
                    ></img>
                </div>
                {/* Category */}
                <p className="absolute bottom-2 left-3  capitalize text-gray-400">
                    {product.category}
                </p>
                {/* Price */}
                <p className="-mr-6 self-end rounded-full bg-red-500 p-2 px-4">
                    {product.price + " €"}
                </p>
            </motion.a>
        </Link>
    );
};
export default ProductCard;
