// * Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”)
// * повертаєстворені HTMLдокументи (розмістіть їх там же, де і додаток),
// * що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,  інформацію про улюблений музичний гурт.

import { createServer } from "node:http";
import fs from "fs";

const server = createServer((req, res) => {
  if (req.url.startsWith("/cafe")) {
    let data = fs.readFileSync("cafe.html", "utf8");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });

    res.end(data);
  } else if (req.url.startsWith("/music")) {
    let data = fs.readFileSync("music.html", "utf8");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });

    res.end(data);
  } else {
    let data = fs.readFileSync("info.html", "utf8");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });

    res.end(data);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
