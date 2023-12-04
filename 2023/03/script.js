const lineReader = require("node:readline").createInterface({
  input: require("fs").createReadStream("./sample.txt"),
});

const x = [0, 1, 2, 3];

const noDots = (el) => el !== ".";
const noUndefined = (el) => el !== undefined;
const onlySymbols = (el) => isNaN(el);

function makeNeighbors(prevCol, nextCol, matrix, currentLine) {
  const neighbors = [
    matrix[currentLine][prevCol],
    matrix[currentLine][nextCol],
    currentLine > 0 ? matrix[currentLine - 1].slice(prevCol, nextCol + 1) : [],
    currentLine + 1 < matrix.length
      ? matrix[currentLine + 1].slice(prevCol, nextCol + 1)
      : [],
  ];
  return neighbors;
}

function getNeighboringSigns(matrix, currentLine, numStart, numEnd) {
  const prevCol = numStart > 0 ? numStart - 1 : 0;
  const nextCol = numEnd === matrix.length - 1 ? numEnd - 1 : numEnd;
  const neighbors = makeNeighbors(prevCol, nextCol, matrix, currentLine);

  return (
    neighbors
      .flatMap((neighbor) => neighbor)
      .filter(noUndefined)
      .filter(noDots)
      .filter(onlySymbols).length > 0
  );
}

function exercice1() {
  let matrix = [];
  lineReader.on("line", (line) => {
    const array = line.split("");
    matrix.push(array);
  });

  lineReader.on("close", () => {
    let currentSum = 0;
    const lines = matrix.map((line, lineIndex) => {
      let nextColIndex = 0;
      const columns = line.map((value, colIndex) => {
        if (colIndex < nextColIndex) {
          return;
        }
        if (!isNaN(value)) {
          let numberEnd = colIndex + 1;
          while (!isNaN(line[numberEnd])) {
            ++numberEnd;
          }
          const hasNeighboringSign = getNeighboringSigns(
            matrix,
            lineIndex,
            colIndex,
            numberEnd
          );
          if (hasNeighboringSign) {
            const numberToAdd = Number(
              line.slice(colIndex, numberEnd).join("")
            );

            currentSum += numberToAdd;
          } else {
          }
          nextColIndex = numberEnd;
        }
      });
    });
    console.log(currentSum);
  });
}

function getNeighboringNumbers(matrix, currentLine, colIndex) {
  const prevCol = colIndex === 0 ? 0 : colIndex - 1;
  const nextCol = colIndex === matrix.length - 1 ? colIndex : colIndex + 1;
  const neighbors = makeNeighbors(prevCol, nextCol, matrix, currentLine);

  const hasTwoNeighborNumbers =
    neighbors.filter((neighborGroup) =>
      Array.isArray(neighborGroup)
        ? neighborGroup.some((el) => !isNaN(el))
        : !isNaN(neighborGroup)
    ).length >= 2;

  if (hasTwoNeighborNumbers) {
  }
}

function isGear(val) {
  return val == "*";
}
function exercise2() {
  let matrix = [];
  let currentSum = 0;
  lineReader.on("line", (line) => {
    const array = line.split("");
    matrix.push(array);
  });

  lineReader.on("close", () => {
    const lines = matrix.map((line, lineIndex) => {
      const columns = line.map((value, colIndex) => {
        if (isGear(value)) {
          const hasNeighboringNumbers = getNeighboringNumbers(
            matrix,
            lineIndex,
            colIndex
          );
        }
      });
    });
  });
}

// exercice1();
exercise2();
