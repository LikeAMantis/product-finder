import { useContext } from "react";
import { Global } from "../pages/_app";

const FilterBtn = ({ shopId, isActive, onShiftClick, onClick }) => {
    const { shiftPressed } = useContext(Global);

    return (
        <button
            className={`cursor-pointer select-none whitespace-nowrap rounded-full px-4 py-1 text-sm capitalize transition-colors duration-200 focus-visible:outline-none  ${
                isActive
                    ? "bg-primary hover:bg-primary-highlight"
                    : "bg-gray-500"
            }`}
            onClick={() => {
                if (shiftPressed) {
                    if (!onShiftClick) return;
                    onShiftClick(shopId);
                    return;
                }
                onClick(shopId);
            }}
        >
            {shopId}
        </button>
    );
};
export default FilterBtn;
