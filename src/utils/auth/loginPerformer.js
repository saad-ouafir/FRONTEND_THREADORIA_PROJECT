const loginPerformer = (signIn, navigate, token) => {
  const success = signIn({
    auth: {
      token: token,
      type: "Bearer",
    },
  });

  if (success) {
    navigate("/profile"); // Optional: Centralize navigation here
  }

  return success;
};

export default loginPerformer;
