import { useState } from "react";

export default function useFormSubmitter(action, options = {}) {
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data) => {
    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await action(data);

      // Handle success
      if (options.showSuccessAlert !== false) {
        setAlert({
          type: "success",
          message:
            options.successMessage ||
            response.message ||
            "Operation completed successfully",
          statusCode: response.status,
        });
      }

      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (error) {
      // Handle error - always show error alerts
      setAlert({
        type: "error",
        message: error.message || "Something went wrong",
        statusCode: error.status || 500,
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAlert = () => setAlert(null);

  return {
    alert,
    isSubmitting,
    submit,
    clearAlert,
    setAlert,
  };
}
