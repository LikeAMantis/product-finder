import { connection } from "../../lib/sql";

const orders = {
    priceAsc: "price asc",
    priceDesc: "price desc",
    category: "category",
    shop: "shop",
};

export default function handler(
    {
        query: {
            search,
            orderBy = "priceAsc",
            excludeShops = "",
            limit = 100,
            page = 1,
        },
    },
    res
) {
    limit = Math.min(limit, 100);
    const offset = (page - 1) * limit;

    console.log("search: ", search);
    if (!search) {
        res.status(404).json({ message: "Need a Search Query!" });
        return;
    }

    excludeShops = excludeShops.split(",");
    console.log("exclude: ", excludeShops);

    const query = `SELECT * FROM products_joined 
        WHERE INSTR(name, "${search}") > 0
        AND shop Not IN (?) 
        ORDER BY ${orders[orderBy]}
        LIMIT ${offset}, ${limit}
        `;

    connection.query(query, [excludeShops], (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
}
