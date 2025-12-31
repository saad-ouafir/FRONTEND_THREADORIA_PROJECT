import { validators, validateForm } from "./formValidation";

export const validateLogin = (values) => {
  return validateForm(values, {
    email: [validators.required, validators.email],
    password: [validators.required, validators.minLength(6)],
  });
};

export const validateRegister = (values) => {
  const { isValid, errors } = validateForm(values, {
    username: [validators.required, validators.username],
    email: [validators.required, validators.email],
    password: [validators.required, validators.minLength(6)],
    confirmPassword: [
      validators.required,
      validators.match(values.password, "password"),
    ],
    // profile_picture: [validators.required], // Optional: add if you want to require image
  });

  if (!values.terms) {
    errors.terms = "You must agree to the terms and conditions";
    return { isValid: false, errors };
  }

  return { isValid, errors };
};
