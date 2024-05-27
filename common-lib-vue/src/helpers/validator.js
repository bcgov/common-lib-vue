export const alphanumericValidator = (value) => {
  const criteria = /^[A-Za-z0-9]+$/;
  return !!value && criteria.test(value);
};

export const alphaValidator = (value) => {
  const criteria = /^[A-Za-z]+$/;
  return !!value && criteria.test(value);
};

export const bcPostalCodeValidator = (value) => {
  const criteria = RegExp('^[Vv]\\d[A-Za-z][ ]?\\d[A-Za-z]\\d$');
  return criteria.test(value);
};

export const nonZeroValidator = (value) => {
  const parsedValue = parseFloat(value);
  if (!isNaN(parsedValue)) {
    return parsedValue !== 0;
  }
  return true;
};

export const optionalValidator = (validator) => {
  return (value, vm) => {
    if (!value) {
      return true;
    }
    return validator(value, vm);
  };
};

export const phoneValidator = (value) => {
  if (!value) {
    return true;
  }
  const stripped = value
        .replace(/_/g, '') // remove underlines
        .replace(/\s/g, '') // spaces
        .replace(/\+|-/g, '') // + or - symbol
        .replace('(', '')
        .replace(')', '');
  return stripped.length === 10;
};

export const postalCodeValidator = (value) => {
  const criteria = RegExp('^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ] {0,1}[0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][0-9]$');
  return criteria.test(value);
};

export const specialCharacterValidator = (value) => {
  const criteria = /^[0-9a-zA-Z-.'# ]*$/;
  return criteria.test(value);
};