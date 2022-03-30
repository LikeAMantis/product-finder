function parseRows(rows) {
    return rows
        .map((x) => x.split(","))
        .map((row) => ({ name: row[1], price: row[2], imgUrl: row[3] }));
}

export { parseRows };
