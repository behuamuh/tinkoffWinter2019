var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tables = [];
process.stdin.on("end", () => {
  checkTables(tables);
  process.exit(0);
});

rl.on("line", function(data) {
  tables.push(data.toString().trim());
  // if (tables[0] && parseInt(tables[0]) === tables.length - 2)
  //   checkTables(tables);
});

function checkTables(arr) {
  const start = arr[arr.length - 1].split(" ").map(a => parseInt(a) - 1);
  const scheme = arr.slice(1, arr.length - 1);
  let count = 0;

  check(start[0], start[1]);

  console.log(count);

  function check(a, b) {
    if (a < 0 || a >= scheme.length) return;
    if (b < 0 || b >= scheme[0].length) return;
    if (scheme[a][b] === "*") return;
    count++;
    checkTop(a - 1, b);
    checkBottom(a + 1, b);
    checkLeft(a, b - 1);
    checkRight(a, b + 1);
  }
  function checkTop(a, b) {
    if (a < 0 || a >= scheme.length) return;
    if (b < 0 || b >= scheme[0].length) return;
    if (scheme[a][b] === "*") return;
    count++;
    checkTop(a - 1, b);
    checkLeft(a, b - 1);
    checkRight(a, b + 1);
  }
  function checkBottom(a, b) {
    if (a < 0 || a >= scheme.length) return;
    if (b < 0 || b >= scheme[0].length) return;
    if (scheme[a][b] === "*") return;
    count++;
    checkBottom(a + 1, b);
    checkLeft(a, b - 1);
    checkRight(a, b + 1);
  }
  function checkLeft(a, b) {
    if (a < 0 || a >= scheme.length) return;
    if (b < 0 || b >= scheme[0].length) return;
    if (scheme[a][b] === "*") return;
    count++;
    checkTop(a - 1, b);
    checkBottom(a + 1, b);
    checkLeft(a, b - 1);
  }
  function checkRight(a, b) {
    if (a < 0 || a >= scheme.length) return;
    if (b < 0 || b >= scheme[0].length) return;
    if (scheme[a][b] === "*") return;
    count++;
    checkTop(a - 1, b);
    checkBottom(a + 1, b);
    checkRight(a, b + 1);
  }
}
