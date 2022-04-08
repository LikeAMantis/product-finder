import { classNames } from "../lib/utils";
import FilterBtn from "./FilterBtn";

const ShopFilter = ({ className, searchInfo, ...props }) => {
    return (
        <div className={classNames("flex gap-1", className)}>
            {searchInfo.map((info) => (
                <div className="flex items-center">
                    <FilterBtn
                        shopId={info.shop}
                        initActive={!props.excludeShops.includes(info.shop)}
                        {...props}
                    />
                    <p className="text-sm text-gray-400">{info.count}</p>
                </div>
            ))}
        </div>
    );
};
export default ShopFilter;
