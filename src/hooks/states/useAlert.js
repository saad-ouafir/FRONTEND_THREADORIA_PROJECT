import { useState, useCallback } from "react";

/**
 * Custom hook for managing alert state
 * @returns {Object} - Alert state and handlers
 */
export function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, statusCode) => {
    setAlert({ message, statusCode });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showSuccess = useCallback((message) => {
    setAlert({ message, statusCode: 200 });
  }, []);

  const showError = useCallback((message) => {
    setAlert({ message, statusCode: 500 });
  }, []);

  return {
    alert,
    setAlert,
    showAlert,
    clearAlert,
    showSuccess,
    showError,
  };
}
