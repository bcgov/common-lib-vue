import { format as formatDateFns } from 'date-fns';

export const formatDate = (date) => {
  if (date instanceof Date) {
    return formatDateFns(date, 'MMMM d, y');
  }
  return date;
};

export const formatISODate = (date) => {
  if (date instanceof Date) {
    return formatDateFns(date, 'yyyy-MM-dd');
  }
  return date;
};

export const getBCTimestamp = () => {
  return formatDateFns(new Date(), 'yyyy-MM-dd HH:mm:ss zzz');
};

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
