var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let notes = [];
process.stdin.on("end", () => {
  checkTime(notes);
  process.exit(0);
});

rl.on("line", function(data) {
  notes.push(data.toString().trim());
  // if (notes[1] && parseInt(notes[1]) === notes.length - 2) checkTime(notes);
});

function checkTime(arr) {
  const now = arr[0].split(" ").map(a => parseInt(a));
  const tasks = arr.slice(2).reduce((acc, note) => {
    const [index, hours, minuts] = note.split(" ").map(a => parseInt(a));
    acc[index - 1]
      ? acc[index - 1].push([hours, minuts])
      : (acc[index - 1] = [[hours, minuts]]);
    return acc;
  }, []);
  tasks.forEach(task => {
    if (!task || !task.length) return;
    task.sort((a, b) => 60 * (a[0] - b[0]) + a[1] - b[1]);
  });

  let next = [];

  for (let i = now[0] - 1; i < 7; i++) {
    if (!tasks[i] || !tasks[i].length) continue;
    for (let j = 0; j < tasks[i].length; j++) {
      if (
        now[0] - 1 < i ||
        (now[0] - 1 === i && now[1] < tasks[i][j][0]) ||
        (now[1] === tasks[i][j][0] && now[2] <= tasks[i][j][1])
      )
        next.push([tasks[i][j]]);
    }
  }

  if (!next.length) {
    for (let i = 0; i < 7; i++) {
      if (!tasks[i] || !tasks[i].length) continue;
      for (let j = 0; j < tasks[i].length; j++) {
        next.push(`${i + 1} ${tasks[i][j].join(" ")}`);
      }
    }
  }
  console.log(next[0]);
}
