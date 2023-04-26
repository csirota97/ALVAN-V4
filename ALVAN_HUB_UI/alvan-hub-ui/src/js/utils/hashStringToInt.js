const hashStringToInt = (str) => {
  let hashValue = 1;
  for (let i = 0; i < str.length; i++) {
    hashValue *= str.charCodeAt(i);
  }
  return hashValue % 2147483647;
};

export default hashStringToInt;
