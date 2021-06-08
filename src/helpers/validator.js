export const optionalValidator = (validator) => {
  return (value) => {
    if (!value) {
      return true;
    }
    return validator(value);
  };
};
