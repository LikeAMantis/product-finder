import { useRouter } from "next/router";
import { useEffect } from "react";
import { classNames } from "../lib/utils";
import FilterBtn from "./FilterBtn";

const ShopFilter = ({
    className,
    searchInfo,
    excludeShops,
    setExcludeShops,
    shops,
}) => {
    const router = useRouter();

    useEffect(() => {
        const query = router.query.excludeShops;
        if (query) {
            setExcludeShops(query.split(","));
        }
    }, []);

    function toggleShop(shopId) {
        if (excludeShops.indexOf(shopId) === -1) {
            pushExcludeShops([...excludeShops, shopId]);
            return;
        }
        pushExcludeShops(excludeShops.filter((x) => x !== shopId));
    }

    function handleShiftClick(shopId) {
        // const shops = ;
        pushExcludeShops(
            shops.map((x) => x.name).filter((shop) => shop !== shopId)
        );
    }

    function pushExcludeShops(newExcludeShops) {
        setExcludeShops(newExcludeShops);
        router.push({
            query: {
                ...router.query,
                excludeShops: newExcludeShops.join(","),
                page: 1,
            },
        });
    }

    return (
        <div className={classNames("flex gap-1", className)}>
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                    <FilterBtn
                        shopId="Select All"
                        isActive={excludeShops.length === 0}
                        onClick={() => {
                            setExcludeShops([]);
                            pushExcludeShops([]);
                        }}
                    />
                    <p className="select-none text-sm text-gray-400">
                        {searchInfo
                            .map((x) => x.count)
                            .reduce((x, y) => x + y, 0)}
                    </p>
                </div>
                {shops.map((shop) => (
                    <div className="flex flex-col items-center">
                        <FilterBtn
                            key={shop.id}
                            shopId={shop.name}
                            isActive={!excludeShops.includes(shop.name)}
                            onClick={toggleShop}
                            onShiftClick={handleShiftClick}
                        />
                        <p className="select-none text-sm text-gray-400">
                            {searchInfo.find((x) => x.shop === shop.name)
                                ?.count ?? 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ShopFilter;
