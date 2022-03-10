import {
  alphanumericValidator,
  alphaValidator,
  bcPostalCodeValidator,
  nonZeroValidator,
  optionalValidator,
  phoneValidator,
  postalCodeValidator,
  specialCharacterValidator,
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

  it('nonZeroValidator', () => {
    expect(nonZeroValidator('0')).toBe(false);
    expect(nonZeroValidator('00')).toBe(false);
    expect(nonZeroValidator('0.00')).toBe(false);
    expect(nonZeroValidator('-0')).toBe(false);
    expect(nonZeroValidator('-00')).toBe(false);
    expect(nonZeroValidator('-0.00')).toBe(false);
    expect(nonZeroValidator(0)).toBe(false);
    expect(nonZeroValidator('123')).toBe(true);
    expect(nonZeroValidator('-123')).toBe(true);
    expect(nonZeroValidator('123.456')).toBe(true);
    expect(nonZeroValidator('-123.456')).toBe(true);
    expect(nonZeroValidator(123)).toBe(true);
    expect(nonZeroValidator(-123)).toBe(true);
    expect(nonZeroValidator(123.456)).toBe(true);
    expect(nonZeroValidator(-123.456)).toBe(true);
    expect(nonZeroValidator(undefined)).toBe(true);
    expect(nonZeroValidator(null)).toBe(true);
    expect(nonZeroValidator(NaN)).toBe(true);
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

  it('postalCodeValidator', () => {
    expect(postalCodeValidator('V8V 8V8')).toBe(true);
    expect(postalCodeValidator('V8V8V8')).toBe(true);
    expect(postalCodeValidator('A1A 1A1')).toBe(true);
    expect(postalCodeValidator('A1A1A1')).toBe(true);
    expect(postalCodeValidator('Hello')).toBe(false);
    expect(postalCodeValidator('')).toBe(false);
    expect(postalCodeValidator(undefined)).toBe(false);
    expect(postalCodeValidator(null)).toBe(false);
    expect(postalCodeValidator(NaN)).toBe(false);
  });

  it('bcPostalCodeValidator', () => {
    expect(bcPostalCodeValidator('V8V 8V8')).toBe(true);
    expect(bcPostalCodeValidator('V8V8V8')).toBe(true);
    expect(bcPostalCodeValidator('A1A 1A1')).toBe(false);
    expect(bcPostalCodeValidator('A1A1A1')).toBe(false);
    expect(bcPostalCodeValidator('Hello')).toBe(false);
    expect(bcPostalCodeValidator('')).toBe(false);
    expect(bcPostalCodeValidator(undefined)).toBe(false);
    expect(bcPostalCodeValidator(null)).toBe(false);
    expect(bcPostalCodeValidator(NaN)).toBe(false);
  });

  it('phoneValidator', () => {
    expect(phoneValidator('1234567890')).toBe(true);
    expect(phoneValidator('(123) 456-7890')).toBe(true);
    expect(phoneValidator('123456789')).toBe(false);
    expect(phoneValidator('')).toBe(true);
    expect(phoneValidator(undefined)).toBe(true);
    expect(phoneValidator(null)).toBe(true);
    expect(phoneValidator(NaN)).toBe(true);
  });

  it('specialCharacterValidator', () => {
    expect(specialCharacterValidator("1234567890")).toBe(true);
    expect(specialCharacterValidator("1aA-.'# ")).toBe(true);
    expect(specialCharacterValidator(';')).toBe(false);
    expect(specialCharacterValidator('')).toBe(true);
    expect(specialCharacterValidator(undefined)).toBe(true);
    expect(specialCharacterValidator(null)).toBe(true);
    expect(specialCharacterValidator(NaN)).toBe(true);
  });
});
