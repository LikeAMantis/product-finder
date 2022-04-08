import { connection } from "../../lib/sql";

const orders = {
    priceAsc: "price asc",
    priceDesc: "price desc",
    category: "category",
    shop: "shop",
};

export default function handler(
    { query: { search, limit = 100, orderBy = "priceAsc", excludeShops = "" } },
    res
) {
    console.log("search: ", search);
    if (!search) {
        res.status(404).json({ message: "Need a Search Query!" });
        return;
    }

    excludeShops = excludeShops.split("%2C");

    console.log("exclude: ", excludeShops);

    const query = `SELECT * FROM products_joined 
        WHERE INSTR(name, "${search}") > 0
        AND shop Not IN (?) 
        ORDER BY ${orders[orderBy]}
        LIMIT ${limit}
        `;

    connection.query(query, [excludeShops], (err, rows) => {
        // console.log(rows);
        if (err) throw err;
        res.status(200).json(rows);
    });
}
