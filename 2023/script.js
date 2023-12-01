const lineReader = require("node:readline").createInterface({
  input: require("fs").createReadStream("./data.txt"),
});

function isNumeric(number) {
  return !isNaN(number);
}

const numbersAsStrings = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const LONGEST_NUMBER_AS_STRING = 5;

const numbersAsStringsArray = Object.keys(numbersAsStrings);

function isNumberAsString(line, start, end, way) {
  const string = line.substring(start, end);

  const forwards = way === "forwards";
  const possibleDigit1 = forwards ? string[0] : string[3];
  const possibleDigit2 = forwards ? string[1] : string[4];

  const x = numbersAsStringsArray.find((digitAsString) => {
    if (string.includes(digitAsString)) {
      if (!isNaN(possibleDigit1) || !isNaN(possibleDigit2)) {
        return false;
      }
      return digitAsString;
    }
  });

  return x;
}

async function getLines() {
  let numbers = [];

  lineReader.on("line", (line) => {
    let start;
    let end;
    for (let i = 0; i < line.length; ++i) {
      if (isNumeric(line[i])) {
        start = line[i];
        break;
      } else if (
        isNumberAsString(line, i, i + LONGEST_NUMBER_AS_STRING, "forwards")
      ) {
        start =
          numbersAsStrings[
            isNumberAsString(line, i, i + LONGEST_NUMBER_AS_STRING, "forwards")
          ];
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; --i) {
      if (isNumeric(line[i])) {
        end = line[i];
        break;
      } else if (
        isNumberAsString(
          line,
          i - LONGEST_NUMBER_AS_STRING + 1,
          i + 1,
          "backwards"
        )
      ) {
        end =
          numbersAsStrings[
            isNumberAsString(
              line,
              i - LONGEST_NUMBER_AS_STRING + 1,
              i + 1,
              "backwards"
            )
          ];
        break;
      }
    }
    numbers.push(`${start}${end}`);
  });
  return numbers;
}

const x = await getLines().then((res) => res);

let sum = 0;
x.forEach((digit) => (sum += Number(digit)));
