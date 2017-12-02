module.exports.part1 = inputArray => {
  return inputArray[0].split('')
    .map(d => +d)
    .map((d, i, digits) => d === digits[(i + 1) % digits.length] ? d : 0)
    .reduce((memo, d) => memo + d, 0);
};

module.exports.part2 = inputArray => {
  const digits = inputArray[0].split('').map(d => +d);
  const length = digits.length;
  const delta = length / 2;
  return digits.map((d, i, digits) => {
    const lookupIndex = (i + delta) % length;
    return digits[lookupIndex] === d ? d : 0;
  })
  .reduce((memo, d) => memo + d, 0);
};
