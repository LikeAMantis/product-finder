import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "David",
    password: "hydo7531",
    database: "product_finder",
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

export { connection };
