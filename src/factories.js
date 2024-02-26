function Ship(length) {
  let noOfHits = 0;

  function hit() {
    noOfHits++;
  }

  function getNoOfHits() {
    return noOfHits;
  }

  function isSunk() {
    return noOfHits === length ? true : false;
  }

  return {
    length,
    getNoOfHits,
    hit,
    isSunk,
  };
}

export { Ship };
