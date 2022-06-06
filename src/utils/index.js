export const generateRandomNumber = (min, max, except) => {
  const randomNumber = Math.round(Math.random() * (max - min)) + min;

  if (randomNumber == except) {
    return this.generateRandomNumber(min, max, except);
  }

  return randomNumber;
};
