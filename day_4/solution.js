module.exports.part1 = inputArray => {
  return inputArray.reduce((count, passphrase) => {
    const words = passphrase.split(' ');
    const wordSet = new Set(words);
    return wordSet.size == words.length ? count + 1 : count;
  }, 0);
}

module.exports.part2 = inputArray => {
  return inputArray.reduce((count, passphrase) => {
    const words = passphrase.split(' ').map(word => word.split('').sort().join());
    const wordSet = new Set(words);
    return wordSet.size == words.length ? count + 1 : count;
  }, 0);
}
