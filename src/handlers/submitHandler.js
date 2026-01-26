export default async function submitHandler(setAlert, submitAPI, submitData, navigate, direction = "/home") {
  setAlert(null);
  try {
    const response = await submitAPI(submitData);
    setAlert({
      message: response.message,
      statusCode: response.status,
    });
    if (navigate) {
      navigate(direction);
    }
    return response;
  } catch (err) {
    return setAlert({
      message: err.message || "Unexpected error ! Please contact us",
      statusCode: err.status || 500,
    });
  }
}
