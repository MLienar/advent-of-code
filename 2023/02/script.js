const lineReader = require("node:readline").createInterface({
  input: require("fs").createReadStream("./input.txt"),
});

const authorizedAmounts = {
  red: 12,
  green: 13,
  blue: 14,
};

function keyToIncrement(string) {
  return string.substring(3, string.length).trim();
}

function valueToAdd(string) {
  const newString = string.trim();
  if (!isNaN(newString[1])) {
    return Number(`${newString[0]}${newString[1]}`);
  }
  return Number(newString[0]);
}

function isValidGame(obj) {
  return (
    obj.red <= authorizedAmounts.red &&
    obj.green <= authorizedAmounts.green &&
    obj.blue <= authorizedAmounts.blue
  );
}

let goodGames = 0;
let powerOfGames = 0;
lineReader.on("line", (line) => {
  makeAnswer1(line);
  makeAnswer2(line);
});

function preFormatLine(line, currentGame) {
  const formattedLine = line.replace("Game " + currentGame + ":", "");

  return formattedLine.split(";");
}

function getCurrentGame(line) {
  const r = /\d+/;
  return line.match(r)[0];
}

function makeAnswer1(line) {
  const currentGame = getCurrentGame(line);
  const draws = preFormatLine(line, currentGame);

  const totals = draws.map((draw) => {
    return draw.split(",").reduce(
      (acc, val) => {
        acc[keyToIncrement(val)] += valueToAdd(val);
        return acc;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );
  });
  if (totals.every((total) => isValidGame(total))) {
    goodGames += Number(currentGame);
  }
}

function makeAnswer2(line) {
  const currentGame = getCurrentGame(line);
  const draws = preFormatLine(line, currentGame);
  const value = draws.reduce(
    (acc, val) => {
      val.split(",").forEach((draw) => {
        if (acc[keyToIncrement(draw)] < valueToAdd(draw)) {
          acc[keyToIncrement(draw)] = valueToAdd(draw);
        }
      });
      return acc;
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    }
  );
  const currentPower = value.red * value.green * value.blue;
  powerOfGames += currentPower;
}

lineReader.on("close", () => {
  console.log("answer1:", goodGames);
  console.log("answer2:", powerOfGames);
});
