export const alphanumericValidator = (value) => {
  const criteria = /^[A-Za-z0-9]+$/;
  return !!value && criteria.test(value);
};

export const alphaValidator = (value) => {
  const criteria = /^[A-Za-z]+$/;
  return !!value && criteria.test(value);
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
