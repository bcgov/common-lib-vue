import {
  format as formatDateFns,
  getDaysInMonth,
  isValid,
} from 'date-fns';
import { padLeadingZeros } from './string';

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

export const isValidISODateString = (isoDateString) => {
  if (typeof isoDateString !== 'string'
    || isoDateString.length !== 10) {
    return false;
  }
  const dateItems = isoDateString.split('-');
  if (dateItems.length !== 3) {
    return false;
  }
  const year = parseInt(dateItems[0]);
  const month = parseInt(dateItems[1]);
  const day = parseInt(dateItems[2]);
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));
  if ( year >= 0
    && year <= 9999
    && month >= 1
    && month <= 12
    && day >= 1
    && day <= daysInMonth) {
    return isValid(new Date(isoDateString));
  }
  return false;
};
