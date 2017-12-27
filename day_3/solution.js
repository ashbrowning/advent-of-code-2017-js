const findDistanceGivenSquare = square => {
  const base = Math.ceil(Math.sqrt(square));
  const radius = Math.ceil((base - 1) / 2);
  let distance = (square + (radius - 1)) % (radius * 2);
  if (distance > radius) {
    distance %= radius;
  }

  return radius + distance;
};

module.exports.part1 = inputArray => findDistanceGivenSquare(+inputArray[0]);

/* Investigated a way to avoid unnecessary computation and try to make it memory efficient too by only holding the numbers we need
 * but ended up being super complicated
*/
module.exports.part2 = inputArray => {
  const target = +inputArray[0];

  const getFirstNumber = (currentIdx, currentCircle, innerCircle) => {
    return innerCircle[0] + innerCircle[innerCircle.length - 1];
  };

  const getSecondNumber = (currentIdx, currentCircle, innerCircle) => {
    return (currentCircle[0] * 2) + innerCircle[1];
  };

  const getSideNumber = side => (currentIdx, currentCircle, innerCircle) => {
    const innerSideIndex = currentIdx - ((side * 2) - 1);
    return currentCircle[currentIdx - 1] + innerCircle[innerSideIndex] + innerCircle[innerSideIndex - 1] + innerCircle[innerSideIndex + 1];
  };

  const getCornerEntryNumber = (cornerIdx, innerCornerIdx) => (currentIdx, currentCircle, innerCircle) => {
    return currentCircle[currentIdx - 1] + innerCircle[innerCornerIdx] + innerCircle[innerCornerIdx - 1] + (cornerIdx === 4 ? currentCircle[0] : 0);
  };

  const getCornerNumber = (cornerIdx, innerCornerIdx) => (currentIdx, currentCircle, innerCircle) => {
    return currentCircle[currentIdx - 1] + innerCircle[innerCornerIdx] + (cornerIdx === 4 ? currentCircle[0] : 0);
  };

  const getCornerExitNumber = (cornerIdx, innerCornerIdx) => (currentIdx, currentCircle, innerCircle) => {
    return currentCircle[currentIdx - 1] + currentCircle[currentIdx - 2] + innerCircle[innerCornerIdx + 1] + innerCircle[innerCornerIdx];
  };

  const addCorner = (cornerIdx, currentRadius) => {
   const innerCornerIdx = ((currentRadius - 1) * 2 * cornerIdx) - 1;
   const arr = [getCornerEntryNumber(cornerIdx, innerCornerIdx), getCornerNumber(cornerIdx, innerCornerIdx)];
   if (cornerIdx !== 4) {
     arr.push(getCornerExitNumber(cornerIdx, innerCornerIdx))
   }
   return arr;
  };

  // Seed with the first circle (of radius 1)
  let innerCircle = [1, 2, 4, 5, 10, 11, 23, 25];
  let currentCircle = [];
  let currentRadius = 2;

  let flag = false;
  while(!flag) {

    let tmpArr = [];
    const maxPos = (currentRadius * 8);
    let i = 0;
    tmpArr.push(getFirstNumber);
    tmpArr.push(getSecondNumber);
    for(let side = 1; side <= 4; side++){
      for(; tmpArr.length < ((maxPos / 4) * side) - 2;) {
        tmpArr.push(getSideNumber(side));
      }
      tmpArr = tmpArr.concat(addCorner(side, currentRadius))
    }

    tmpArr.forEach((fn, idx) => {
      const number = fn(idx, currentCircle, innerCircle);
      if (number >= target && !flag) {
        flag = number;
      }
      currentCircle[idx] = number;
    });

    innerCircle = currentCircle;
    currentCircle = [];
    currentRadius += 1;
  }

  return flag;
};
