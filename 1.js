var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdin.on("end", () => {
  process.exit(0);
});

rl.on("line", function(data) {
  const message = data
    .split(" ")
    .filter(word => word.length)
    .join(" ")
    .trim();

  console.log(message);
});
