import { getData } from "../../../lib/firestore";

var categories = getData("categories");
var shops = getData("shops");

export default function handler(
    { query: { categoryId, from = 0, to = 100 } },
    res
) {
    async function getProducts() {
        var products;
        Promise.all([
            (categories = await categories),
            (shops = await shops),
            (products = await getData("products")),
        ]);

        shops = shops.map((shop) => ({
            ...shop,
            categories: categories.filter(
                (category) => shop.id === category.shopId
            ),
        }));

        shops.forEach((element) => {
            element.categories.forEach((element) => delete element.shopId);
        });

        shops = shops.map((shop) => ({
            ...shop,
            items: products.filter((product) =>
                shop.categories.map((x) => x.id).includes(product.categoryId)
            ),
        }));

        res.status(200).json(shops);
    }

    getProducts();
}
