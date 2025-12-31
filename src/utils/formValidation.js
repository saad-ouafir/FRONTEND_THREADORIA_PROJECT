// Basic validators - each returns error message or null
export const validators = {
  required: (value) => (!value ? "This field is required" : null),

  email: (value) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? "Invalid email address"
      : null,

  minLength: (min) => (value) =>
    value && value.length < min ? `Minimum ${min} characters` : null,

  maxLength: (max) => (value) =>
    value && value.length > max ? `Maximum ${max} characters` : null,

  match: (otherValue, fieldName) => (value) =>
    value !== otherValue ? `Must match ${fieldName}` : null,

  username: (value) =>
    value && !/^[a-zA-Z0-9_]{3,20}$/.test(value)
      ? "Username must be 3-20 characters, letters, numbers, and underscores only"
      : null,
};

export const validateField = (value, rules = []) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

export const validateForm = (values, schema) => {
  const errors = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(values[field], rules);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};
