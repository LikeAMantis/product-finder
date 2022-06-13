import { connection } from "../../lib/sql";

const orders = {
    priceAsc: "price asc",
    priceDesc: "price desc",
    category: "categoryId",
    shop: "shopId",
};

export default function handler(
    {
        query: {
            search,
            orderBy = "priceAsc",
            excludeShops = "",
            excludeCategories = "",
            limit = 100,
            page = 1,
        },
    },
    res
) {
    limit = Math.min(limit, 100);
    const offset = (page - 1) * limit;

    if (!search) {
        res.status(404).json({ message: "Need a Search Query!" });
        return;
    }

    excludeShops = excludeShops.split(",");
    excludeCategories = excludeCategories.split(",");

    const query = `SELECT * FROM products 
        WHERE INSTR(LOWER(name), "${search.toLowerCase()}") > 0
        AND shopId Not IN (?) AND categoryId Not IN (?)
        ORDER BY ${orders[orderBy]}
        LIMIT ${offset}, ${limit}
        `;

    connection.query(query, [excludeShops, excludeCategories], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
}
