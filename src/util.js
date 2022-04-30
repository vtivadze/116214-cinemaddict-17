const getRandomInteger = (min = 0, max = 1) => {
  min = Math.ceil(Math.min(min, max));
  max = Math.floor(Math.max(min, max));

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomFloat = (min = 0, max = 1, decimalCount = 1) => {
  const decimalFactor = Math.pow(10, decimalCount);

  min = Math.round(min * decimalFactor);
  max = Math.round(max * decimalFactor);

  return getRandomInteger(min, max) / decimalFactor;
};

export {getRandomInteger, getRandomFloat};
