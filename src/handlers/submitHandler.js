export default async function submitHandler({
  e,
  values,
  validate,
  setErrors,
  apiCall,
  setAlert,
  setIsLoading,
  onSuccess,
}) {
  e.preventDefault();
  setAlert(null);

  const { isValid, errors } = validate(values);
  setErrors(errors);
  if (!isValid) return;

  setIsLoading(true);
  try {
    const response = await apiCall(values);
    setAlert({ message: response.message, statusCode: response.status });
    onSuccess?.(response);
  } catch (error) {
    setAlert({ message: error.message, statusCode: error.status });
  } finally {
    setIsLoading(false);
  }
}
