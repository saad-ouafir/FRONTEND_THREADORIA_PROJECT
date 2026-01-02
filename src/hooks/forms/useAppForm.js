import { useForm } from "react-hook-form";

const useValidatedForm = (resolver) => {
  return useForm({
    mode: "onSubmit",
    resolver,
  });
};

// login form
export default function useLoginForm() {
  return useValidatedForm(async (values) => {
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
export const useRegisterForm = () =>
  useValidatedForm(async (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = { message: "Username is required" };
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(values.username)) {
      errors.username = { message: "3–20 chars, letters/numbers only" };
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
    };
  });
