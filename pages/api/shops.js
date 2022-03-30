import { readdirSync } from "fs";

var shops = readdirSync("E:/Projects/Coding/Web/shop-scrapper/data").map(
    (folder) => ({
        name: folder,
        categories: readdirSync(
            `E:/Projects/Coding/Web/shop-scrapper/data/${folder}`
        ).map((file) => file.replace(".csv", "")),
    })
);

export default function handler(req, res) {
    res.status(200).json(shops);
}
