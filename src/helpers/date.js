export const getISODateString = (year, month, day) => {
  return `${padLeadingZeros(year, 4)}-${padLeadingZeros(month, 2)}-${padLeadingZeros(day, 2)}`;
};

const padLeadingZeros = (number, size) => {
  if (!number) {
    number = 0;
  }
  if (!size) {
    size = 0;
  }
  let result = number + '';
  while (result.length < size) {
    result = '0' + result;
  }
  return result;
};
