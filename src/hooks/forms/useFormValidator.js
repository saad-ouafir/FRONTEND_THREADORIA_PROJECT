import { useForm } from "react-hook-form";

const useValidatedForm = (resolver, options = {}) => {
  return useForm({
    mode: "onSubmit",
    resolver,
    ...options,
  });
};

// login form
export function useValidateLoginForm() {
  return useValidatedForm(async values => {
    const errors = {};

    if (!values.email) {
      errors.email = { message: "Email is required" };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = { message: "Invalid email format" };
    }

    if (!values.password) {
      errors.password = { message: "Password is required" };
    } else if (values.password.length < 6) {
      errors.password = {
        message: "Password must contain at least 6 characters",
      };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  });
}
// register form
export function useValidateRegisterForm() {
  return useValidatedForm(async values => {
    const errors = {};

    if (!values.full_name) {
      errors.full_name = { message: "Full name is required" };
    } else if (values.full_name.length < 2 || values.full_name.length > 100) {
      errors.full_name = { message: "Full name must be 2–100 characters" };
    }

    if (!values.username) {
      errors.username = { message: "Username is required" };
    } else if (!/^[a-zA-Z0-9_]{3,50}$/.test(values.username)) {
      errors.username = { message: "3–50 chars, letters/numbers/underscores only" };
    }

    if (!values.email) {
      errors.email = { message: "Email is required" };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = { message: "Invalid email" };
    }

    if (!values.password) {
      errors.password = { message: "Password is required" };
    } else if (values.password.length < 6) {
      errors.password = { message: "Min 6 characters" };
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = { message: "Passwords do not match" };
    }

    if (values.terms !== true) {
      errors.terms = { message: "You must accept terms" };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  });
}

// profile form
export function useValidateProfileForm(options = {}) {
  return useValidatedForm(async values => {
    const errors = {};

    if (values.full_name && values.full_name.length < 2) {
      errors.full_name = { message: "Name must be at least 2 characters" };
    } else if (values.full_name && values.full_name.length > 100) {
      errors.full_name = { message: "Name must not exceed 100 characters" };
    }

    if (values.username && !/^[a-zA-Z0-9_]{3,50}$/.test(values.username)) {
      errors.username = { message: "3–50 chars, letters/numbers/underscores only" };
    }

    if (values.bio && values.bio.length > 160) {
      errors.bio = { message: "Bio must not exceed 160 characters" };
    }

    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  }, options);
}

export default { useValidateLoginForm, useValidateRegisterForm, useValidateProfileForm };
