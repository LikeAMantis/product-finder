import { connection } from "../../lib/sql";

export default function handler(
    { query: { search = "", excludeShops = "", excludeCategories = "" } },
    res
) {
    if (search.length == 0) {
        res.status(404).json({ message: "Need a Search Query!" });
        return;
    }

    excludeShops = excludeShops.split(",");
    excludeCategories = excludeCategories.split(",");

    const query = `
        SELECT count(*) AS "count", shopId FROM products 
        WHERE INSTR(name, "${search}") > 0
        GROUP BY shopId;

        SELECT count(*) AS "count", categoryId from products 
        WHERE INSTR(name, "${search}") > 0
        AND shopId Not IN (?) AND categoryId Not IN (?)
        GROUP BY categoryId;
        `;

    connection.query(
        query,
        [excludeShops, excludeCategories, excludeShops, excludeCategories],
        (err, rows) => {
            if (err) throw err;
            const data = {
                shopCounts: rows[0],
                categories: rows[1],
            };

            console.log(data);
            res.status(200).json(data);
        }
    );
}
