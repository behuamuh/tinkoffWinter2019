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
  // const line = base[0];
  // if (base.length === 3 * line + 1) checkBase(base);
});

function checkBase(arr) {
  const answer = [];
  const newArr = arr.slice(0);
  const size = parseInt(newArr.shift());
  const reports = newArr
    .reduce((acc, line, index) => {
      const resIndex = Math.floor(index / 3);
      if (index % 3 === 0) acc[resIndex] = [];
      acc[resIndex][index % 3] = line;
      return acc;
    }, [])
    .map(item => [
      item[0],
      new Date(
        item[1].split(".")[2],
        item[1].split(".")[1] - 1,
        item[1].split(".")[0]
      ),
      parseInt(item[2]),
      false
    ]);
  const passingDays = reports.map(report => report[1]);

  const minStartRec = reports.sort((a, b) => {
    return (
      a[1].getTime() -
      a[2] * 1000 * 60 * 60 * 24 -
      (b[1].getTime() - b[2] * 1000 * 60 * 60 * 24)
    );
  })[0];
  let minStart =
    minStartRec[1].getTime() - minStartRec[2] * 1000 * 60 * 60 * 24;

  reports.sort((a, b) => a[1] - b[1]);

  while (minStart <= reports[reports.length - 1][1].getTime()) {
    for (
      let time = minStart;
      time <= reports[reports.length - 1][1].getTime();
      time += 1000 * 60 * 60 * 24
    ) {
      if (passingDays.includes(new Date(time))) continue;
      reports.forEach(report => {
        if (report[3]) return;
        if (report[1].getTime() <= time) return;
        report[3] = true;
        time += 1000 * 60 * 60 * 24;
      });
    }

    if (reports.filter(rep => !rep[3]).length > 0) {
      answer.push("NO");
      return;
    }

    answer.push(
      `${
        new Date(minStart).getDate().length > 1
          ? new Date(minStart).getDate()
          : "0" + new Date(minStart).getDate()
      }.${
        new Date(minStart).getMonth() + 1 > 9
          ? new Date(minStart).getMonth() + 1
          : "0" + (new Date(minStart).getMonth() + 1)
      }.${new Date(minStart).getFullYear()}`
    );
    minStart += 1000 * 60 * 60 * 24;
  }
  if (!answer.length) {
    console.log("NO");
    return;
  }

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === " NO") {
      console.log("NO");
      return;
    }
    if (answer[i + 1] === " NO") {
      console.log(answer[i]);
      return;
    }
  }
}
