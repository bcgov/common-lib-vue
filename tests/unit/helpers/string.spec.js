import { replaceAt } from '../../../src/helpers/string';

describe('Date helpers', () => {
  it('replaceAt', () => {
    expect(replaceAt('Hello', 0, 'J')).toEqual('Jello');
    expect(replaceAt('Hello', 2, '!!')).toEqual('He!!o');
    expect(replaceAt('Hello', 5, 'World')).toEqual('HelloWorld');
    expect(replaceAt('Hello', 999, 'World')).toEqual('HelloWorld');
    expect(replaceAt('Hello', 4, 'World')).toEqual('HellWorld');
  });
});
