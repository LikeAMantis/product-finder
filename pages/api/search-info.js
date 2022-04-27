import { connection } from "../../lib/sql";

export default function handler({ query: { search = "" } }, res) {
    if (!search) {
        res.status(404).json({ message: "Need a Search Query!" });
        return;
    }

    connection.query(
        `SELECT count(*) AS "count", shopId FROM products WHERE INSTR(name, "${search}") > 0 GROUP BY shopId`,
        (err, rows) => {
            if (err) throw err;
            res.status(200).json(rows);
        }
    );
}
