import { useContext } from "react";
import { classNames } from "../lib/utils";
import { Global } from "../pages/_app";

const FilterBtn = ({
    shopId,
    onShiftClick,
    onClick,
    disabled,
    className,
    count,
}) => {
    const { shiftPressed } = useContext(Global);

    return (
        <button
            className={className}
            onClick={() => {
                if (shiftPressed) {
                    if (!onShiftClick) return;
                    onShiftClick(shopId);
                    return;
                }
                onClick(shopId);
            }}
            disabled={disabled}
        >
            {shopId} {count && <span className="font-semibold">({count})</span>}
        </button>
    );
};
export default FilterBtn;
