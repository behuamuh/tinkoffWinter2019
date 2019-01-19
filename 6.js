var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let base = [];
process.stdin.on("end", () => {
  checkBase(base);
  process.exit(0);
});

rl.on("line", function(data) {
  base.push(data.toString().trim());
  // const line = data.toString().trim();
  // if (!line.length) checkBase(base);
});

function checkBase(arr) {
  const result = arr.reduce((acc, line) => {
    const [saler, item, quantity] = line.split(" ");
    if (!acc[saler]) acc[saler] = {};
    if (!acc[saler][item]) {
      acc[saler][item] = +quantity;
    } else {
      acc[saler][item] += +quantity;
    }
    return acc;
  }, {});

  Object.keys(result).forEach(key => {
    if (!key) return;
    console.log(`${key}:`);
    Object.keys(result[key])
      .sort()
      .forEach(subKey => {
        console.log(subKey, result[key][subKey]);
      });
  });
}
