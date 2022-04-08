import { useState } from "react";

const FilterBtn = ({ shopId, toggleShop, initActive }) => {
    const [active, setActive] = useState(initActive);

    return (
        <button
            className={`cursor-pointer select-none rounded-full px-4 py-1 text-sm capitalize transition-colors duration-200  ${
                active ? "bg-primary hover:bg-primary-highlight" : "bg-gray-500"
            }`}
            onClick={() => {
                setActive(!active);
                toggleShop(shopId);
            }}
        >
            {shopId}
        </button>
    );
};
export default FilterBtn;
