SELECT productId as "id", p.name, price, imgUrl, c.name as "category", s.name as "shop"
FROM products AS p
   INNER JOIN
   categories AS c
   ON p.categoryId = c.categoryId
   INNER JOIN
   shops AS s
   ON c.shopId = s.shopId
   WHERE INSTR(p.name, 'apfel') > 0