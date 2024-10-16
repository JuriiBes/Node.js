// * Умова задачі:

// * У консольний додаток передають через параметр пенсійний вік. Наприклад
// * node app.mjs –-pension=65
// * Потім питаємо у терміналі користувача скільки йому років (використати “readline”) і кажемо чи він є пенсіонером.

// ! Method process

// import { argv } from "process";

// const dataParams = argv.slice(2).join("&");

// const dataObject = new URLSearchParams(dataParams);

// if (parseInt(dataObject.get("--pension")) >= 65) {
//   console.log(`You age ${dataObject.get("--pension")} - you are retired`);
// } else {
//   let yearsBeforeRetirement = 65 - parseInt(dataObject.get("--pension"));
//   console.log(`You have ${yearsBeforeRetirement} years left before retirement`);
// }

// ! Method readline

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ! Method 1.0.1
// rl.question("Enter you age:", (age) => {
//   if (!parseInt(age)) {
//     console.log("Invalid data entered");
//   } else {
//     if (age >= 65) {
//       console.log(`You age ${age} - you are retired.`);
//     } else {
//       let yearsBeforeRetirement = 65 - age;
//       console.log(`You have ${yearsBeforeRetirement} years left before retirement.`);
//     }
//   }
//   rl.close();
// });

// ! Method 1.0.2
rl.setPrompt("Enter you age:");
rl.prompt();

rl.on("line", (age) => {
  if (!parseInt(age)) {
    console.log("Invalid data entered");
  } else {
    if (age >= 65) {
      console.log(`You age ${age} - you are retired.`);
    } else {
      let yearsBeforeRetirement = 65 - age;
      console.log(
        `You have ${yearsBeforeRetirement} years left before retirement.`
      );
    }
  }
  rl.close();
});
