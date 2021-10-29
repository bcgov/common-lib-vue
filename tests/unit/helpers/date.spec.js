import { parseISO } from 'date-fns';
import {
  calculateAge,
  getBCTimestamp,
  getISODateString,
  formatDate,
  formatISODate,
  isValidISODateString,
} from '../../../src/helpers/date';

describe('Date helpers', () => {
  const oneDigitDate = parseISO('2021-07-01');
  const twoDigitDate = parseISO('2021-07-21');
  
  it('getISODateString', () => {
    expect(getISODateString('2021', '07', '08')).toEqual('2021-07-08');
    expect(getISODateString('2021', '7', '8')).toEqual('2021-07-08');
    expect(getISODateString(2021, 7, 8)).toEqual('2021-07-08');
    expect(getISODateString(null, 7, 8)).toEqual('0000-07-08');
    expect(getISODateString(2021, null, 8)).toEqual('2021-00-08');
    expect(getISODateString(2021, 7, null)).toEqual('2021-07-00');
    expect(getISODateString(null, null, null)).toEqual('0000-00-00');
    expect(getISODateString(undefined, undefined, undefined)).toEqual('0000-00-00');
    expect(getISODateString(NaN, NaN, NaN)).toEqual('0000-00-00');
  });

  it('isValidISODateString', () => {
    expect(isValidISODateString('2021-07-08')).toBe(true);
    expect(isValidISODateString('2021-08-01')).toBe(true);
    expect(isValidISODateString('0000-01-01')).toBe(true);
    expect(isValidISODateString('2021-02-31')).toBe(false);
    expect(isValidISODateString('0000-00-00')).toBe(false);
    expect(isValidISODateString(123)).toBe(false);
    expect(isValidISODateString('2021')).toBe(false);
    expect(isValidISODateString('ABC')).toBe(false);
    expect(isValidISODateString('ABCD-EF-GH')).toBe(false);
    expect(isValidISODateString('2021-8-1')).toBe(false);
    expect(isValidISODateString('2021-01-0A')).toBe(false);
    expect(isValidISODateString('2021-0B-01')).toBe(false);
    expect(isValidISODateString('202C-01-01')).toBe(false);
    expect(isValidISODateString(undefined)).toBe(false);
    expect(isValidISODateString(null)).toBe(false);
    expect(isValidISODateString(NaN)).toBe(false);
  });

  it('formatDate', () => {
    expect(formatDate(oneDigitDate)).toEqual('July 1, 2021');
    expect(formatDate(twoDigitDate)).toEqual('July 21, 2021');
    expect(formatDate(123)).toEqual(123);
    expect(formatDate(undefined)).toEqual(undefined);
    expect(formatDate(null)).toEqual(null);
    expect(formatDate(NaN)).toEqual(NaN);
  });

  it('formatISODate', () => {
    expect(formatISODate(oneDigitDate)).toEqual('2021-07-01');
    expect(formatISODate(twoDigitDate)).toEqual('2021-07-21');
    expect(formatISODate(123)).toEqual(123);
    expect(formatISODate(undefined)).toEqual(undefined);
    expect(formatISODate(null)).toEqual(null);
    expect(formatISODate(NaN)).toEqual(NaN);
  });

  it('getBCTimestamp', () => {
    expect(typeof getBCTimestamp() === 'string').toBe(true);
  });

  it('calculateAge', () => {
    let input = new Date();
    input.setFullYear( input.getFullYear() - 10 );
    expect(calculateAge(input)).toBe(10);
    input.setDate( input.getDate() + 1 );
    expect(calculateAge(input)).toBe(9);
    input = 'invalid input'
    expect(calculateAge(input)).toBe(undefined);
  });
});
