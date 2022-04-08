import { connection } from "../../lib/sql";

export default function handler(req, res) {
    connection.query(`SELECT * FROM shops`, (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
}
