// * Створити додаток з історією. У файлі json зберігаємо усі роутита кількість відвідувань.
// * У налаштуваннях settings.json зберігати який роут треба використати для перегляду історії та назву файлу де зберігається історія.

import { createServer } from "node:http";
import fs from "fs";
import url from "url";
import settingsJson from "./settings.json" assert { type: "json" };

const server = createServer((req, res) => {
  const historyPath = settingsJson.historyFilePath;

  if (!fs.existsSync(historyPath)) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("File history.json not found!\n");
  }

  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;

  let data = JSON.parse(fs.readFileSync(historyPath));

  if (pathname != "./favicon.ico") {
    if (pathname === "./history") {
      data[pathname] = (parseInt(data[pathname]) || 0) + 1;
      fs.writeFileSync(historyPath, JSON.stringify(data), "utf8");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else {
      data[pathname] = (parseInt(data[pathname]) || 0) + 1;
      fs.writeFileSync(historyPath, JSON.stringify(data), "utf8");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("History update");
    }
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
