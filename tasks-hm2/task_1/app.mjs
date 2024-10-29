// * Розробити додаток з такими маршрутами:
// * Маршрут	Що повертає
// * season	- повертає пору року
// * day	- повертає поточний день
// * time	- повертає час дня (ранок, обід, вечеря)

import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url);
  let pathname = `${parseUrl.pathname}`;
  console.log(pathname);

  let result;
  if (pathname !== "/favicon.ico") {
    switch (pathname) {
      case "/seasons":
        result = "Today - " + definitionSeasons(new Date().getMonth());
        break;
      case "/day":
        result = "Today - " + definitionDay(new Date().getUTCDay());
        break;
      case "/time":
        result = "Now - " + definitionTime(new Date().getHours());
        break;
      default:
        result = "Have a nice day!";
        break;
    }
  }
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8;" });
  res.end(result);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

function definitionSeasons(month) {
  switch (month) {
    case 1:
    case 2:
    case 12:
      return "Winter";
    case 3:
    case 4:
    case 5:
      return "Spring";
    case 6:
    case 7:
    case 8:
      return "Summer";
    case 9:
    case 10:
    case 11:
      return "Autumn";
  }
}
function definitionDay(numDay) {
  let weekDays = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  return weekDays[numDay];
}

function definitionTime(time) {
  let inputValue = parseInt(time);
  if (6 >= inputValue || inputValue > 22) return "Night";
  else if (inputValue > 18) return "Afternoon";
  else if (inputValue > 10) return "Day";
  else if (inputValue > 6) return "Morning";
}
