var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let roads = [];
process.stdin.on("end", () => {
  checkRoads(roads);
  process.exit(0);
});

rl.on("line", function(data) {
  roads.push(data.toString().trim());
});

function checkRoads(arr) {
  const result = arr.slice(0);
  result.shift();
  const size =
    result.reduce((acc, line) => {
      const count = line.split("").filter(s => s == "1").length;
      return acc + count;
    }, 0) / 2;
  console.log(size);
}
