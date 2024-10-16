// * Умова задачі:

// * Користувач через роут‘/save_num/число’ може передати на сервер якесь число. Ці числа поступово треба зберігати у текстовому файлі numbers.txt.
// * Наприклад, використовуючи такий роут: http://localhost:3000/save_num/78-  у файл треба додати число 78.
// * А використовуючи роути ‘/sum’ – знайти суму, ‘mult’ –знайти добуток. За роутом «/remove» файл треба видалити.

import { createServer } from "node:http";
import fs from "fs";

const server = createServer((req, res) => {
  const numbersFilePath = "numbers.txt";

  if (!fs.existsSync(numbersFilePath)) {
    fs.writeFileSync(numbersFilePath, "", "utf8");
    console.log("File create.");
  }

  if (req.url.startsWith("/save_num/")) {
    let enterData = req.url.slice(10);

    fs.appendFileSync(numbersFilePath, `${enterData}\n`);

    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end("Numbers added to file.\n");
  } else if (req.url === "/sum") {
    fs.readFile(numbersFilePath, "utf8", function (err, data) {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end("Something went wrong!\n");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });

        res.end(`Sum numbers = ${numbersSum(data)}\n`);
      }
    });
  } else if (req.url === "/mult") {
    fs.readFile(numbersFilePath, "utf8", function (err, data) {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end("Something went wrong!\n");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });

        res.end(`Product numbers = ${numbersProduct(data)}\n`);
      }
    });
  } else if (req.url === "/remove") {
    fs.unlinkSync(numbersFilePath);

    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end("File remove!\n");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end("Unknown command!\n");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

function numbersSum(dataNumbers) {
  return dataNumbers
    .split("\n")
    .filter((element) => !!element)
    .reduce((sum, element) => (sum = sum + parseInt(element)), 0);
}

function numbersProduct(dataNumbers) {
  return dataNumbers
    .split("\n")
    .filter((element) => !!element)
    .reduce((product, element) => (product = product * parseInt(element)), 1);
}
