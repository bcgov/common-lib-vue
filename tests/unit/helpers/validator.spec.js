import {
  alphanumericValidator,
  alphaValidator,
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
    expect(alphanumericValidator('')).toBe(false);
    expect(alphanumericValidator(undefined)).toBe(false);
    expect(alphanumericValidator(null)).toBe(false);
    expect(alphanumericValidator(NaN)).toBe(false);
  });

  it('alphaValidator', () => {
    expect(alphaValidator('abc')).toBe(true);
    expect(alphaValidator('ABC')).toBe(true);
    expect(alphaValidator('abc123')).toBe(false);
    expect(alphaValidator('ABC123')).toBe(false);
    expect(alphaValidator('123')).toBe(false);
    expect(alphaValidator(123)).toBe(false);
    expect(alphaValidator('')).toBe(false);
    expect(alphaValidator(undefined)).toBe(false);
    expect(alphaValidator(null)).toBe(false);
    expect(alphaValidator(NaN)).toBe(false);
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
