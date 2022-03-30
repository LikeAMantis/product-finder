import { readFile } from "fs";
import { parseRows } from "../../../lib/api";

const shops = [
    { id: 1, name: "spar" },
    { id: 2, name: "billa" },
];

const categories = [
    { id: 1, name: "test", shopId: 1 },
    { id: 2, name: "vorratsschrank", shopId: 1 },
];

export default function handler(
    { query: { categoryId, from = 0, to = 100 } },
    res
) {
    if (!categoryId) {
        res.status(404).json({ message: "Need a Category Id!" });
        return;
    }

    const shopId = categories.find(
        (categorie) => categoryId == categorie.id
    )?.shopId;
    if (!shopId) {
        res.status(404).json({ message: "Category Id does not exist!" });
        return;
    }

    const shopName = shops.find((shop) => shopId == shop.id).name;
    const categoryName = categories.find(
        (categorie) => categoryId == categorie.id
    ).name;

    readFile(
        `E:/Projects/Coding/Web/shop-scrapper/data/${shopName}/${categoryName}.csv`,
        "utf8",
        function (err, fileData) {
            const rows = fileData.split("\n");
            rows.shift();

            const products = parseRows(rows.slice(from, to));
            res.status(200).json(products);
        }
    );
}
