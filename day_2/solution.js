module.exports.part1 = inputArray => {
  return inputArray.reduce((rowDiffs, row) => {
    const sortedRow = row.split('\t')
      .map(d => +d)
      .sort((a, b) => a - b);
    rowDiffs.push(sortedRow[sortedRow.length - 1] - sortedRow[0]);
    return rowDiffs;
  }, [])
    .reduce((total, row) => total + row, 0);
};

module.exports.part2 = inputArray => {
  return inputArray.reduce((rowDiffs, row) => {
    const sortedRow = row.split('\t')
      .map(d => +d)
      .sort((a, b) => a - b);
      for( i = sortedRow.length - 1; i >= 0; --i ) {
        for( j = 0; j < i; ++j ) {
            const div = sortedRow[i] / sortedRow[j];
            if (div === parseInt(div, 10)) {
              rowDiffs.push(div);
              return rowDiffs;
            }
        }
      }
      rowDiffs.push(0);
      return rowDiffs;
  }, [])
    .reduce((total, row) => total + row, 0);
};
