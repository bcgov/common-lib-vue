import { getISODateString } from '../../../src/helpers/date';

describe('Date helpers', () => {
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
});
