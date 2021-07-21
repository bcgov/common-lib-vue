import { parseISO } from 'date-fns';
import {
  getBCTimestamp,
  getISODateString,
  formatDate,
  formatISODate,
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
});
