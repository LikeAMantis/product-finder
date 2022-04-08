import { AnimatePresence, motion } from "framer-motion";

const ProductCard = ({ product, logoUrl }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="relative flex h-min w-[90%] cursor-pointer flex-col gap-4 p-5 px-12 pt-10 shadow-md shadow-black transition-transform duration-150 hover:scale-105 md:w-64"
                // layout="position"
                transition={{ duration: 0.3 }}
            >
                {/* Logo */}
                <img
                    className="absolute left-0 top-0 w-8 rounded-sm"
                    src={logoUrl}
                ></img>
                {/* Name */}
                <p className="h-16 font-medium">{product.name}</p>
                {/* Product Image */}
                <div className="flex w-44 justify-center self-center">
                    <img src={product.imgUrl}></img>
                </div>
                {/* Category */}
                <p className="absolute bottom-2 left-3  capitalize text-gray-400">
                    {product.category}
                </p>
                {/* Price */}
                <p className="-mr-6 self-end rounded-full bg-red-500 p-2 px-4">
                    {product.price + " €"}
                </p>
            </motion.div>
        </AnimatePresence>
    );
};
export default ProductCard;
