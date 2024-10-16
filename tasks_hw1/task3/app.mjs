// * Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами),
// * які треба опрацювати. Знайти результат і повернути користувачу. Наприклад при запиті:
// * http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45

import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.url.startsWith("/add/")) {
    let sumNum = req.url
      .slice(5)
      .split("-")
      .reduce((sum, el) => (sum = sum + parseInt(el)), 0);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Add result = ${sumNum}\n`);
  } else if (req.url.startsWith("/mult/")) {
    let productNum = req.url
      .slice(6)
      .split("-")
      .reduce((prod, el) => (prod = prod * parseInt(el)), 1);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Product result = ${productNum}\n`);
  } else if (req.url.startsWith("/subtract/")) {
    let subtractNum = req.url
      .slice(10)
      .split("-")
      .reduce(
        (sub, el, index) =>
          index === 0 ? (sub = parseInt(el)) : (sub = sub - parseInt(el)),
        0
      );

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Subtract result = ${subtractNum}\n`);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Unknown request`);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
