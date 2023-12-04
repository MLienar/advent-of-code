const { noUndefined, noDots, onlySymbols } = require("./script");

function getNeighboringSigns(matrix, currentLine, numStart, numEnd) {
  const neighbors = [
    matrix[currentLine][numStart - 1],
    matrix[currentLine][numEnd + 1],
    currentLine > 0
      ? matrix[currentLine - 1].slice(numStart - 1, numEnd - 1)
      : [],
    currentLine < matrix.length - 1
      ? matrix[currentLine + 1].slice(numStart - 1, numEnd + 1)
      : [],
  ];
  if ((currentLine = 1)) {
    console.log(matrix[currentLine].slice(numStart, numEnd));
  }
  return neighbors
    .flatMap((neighbor) => neighbor)
    .filter(noUndefined)
    .filter(noDots)
    .filter(onlySymbols).length;
}
exports.getNeighboringSigns = getNeighboringSigns;
