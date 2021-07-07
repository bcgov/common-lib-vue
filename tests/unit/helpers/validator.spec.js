import {
  alphanumericValidator,
  optionalValidator,
} from '../../../src/helpers/validator';


describe('Validators', () => {
  it('alphanumericValidator', () => {
    expect(alphanumericValidator('123')).toBe(true);
    expect(alphanumericValidator('ABC')).toBe(true);
    expect(alphanumericValidator('abc')).toBe(true);
    expect(alphanumericValidator('123ABCabc')).toBe(true);
    expect(alphanumericValidator(123)).toBe(true);
    expect(alphanumericValidator('123ABCabc ')).toBe(false);
    expect(alphanumericValidator('123ABCabc.')).toBe(false);
    expect(alphanumericValidator('123ABCabc;')).toBe(false);
  });

  it('optionalValidator', () => {
    expect(optionalValidator(() => {
      return false;
    })(undefined)).toBe(true);

    expect(optionalValidator(() => {
      return false;
    })(null)).toBe(true);

    expect(optionalValidator(() => {
      return false;
    })(NaN)).toBe(true);

    expect(optionalValidator(() => {
      return false;
    })('Test')).toBe(false);

    expect(optionalValidator(() => {
      return false;
    })(new Date())).toBe(false);
  });
});
