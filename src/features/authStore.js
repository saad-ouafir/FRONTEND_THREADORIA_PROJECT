import createStore from "react-auth-kit";
import axios from "axios";

const authStore = createStore({
  authName: "_auth",
  authType: "cookie", // How the Access Token is stored on frontend
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: {
    // This function is triggered when the Access Token expires
    createRefresh: {
      interval: 10, // Check every 10 mins (optional)
      refreshApiCallback: async (param) => {
        try {
          // The Refresh Token is in an HTTP-only cookie,
          // so we don't pass it in the body. The browser sends it automatically.
          const response = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            {},
            {
              withCredentials: true, // CRITICAL: Sends HTTP-only cookies
            }
          );

          return {
            isSuccess: true,
            newAuthToken: response.data.accessToken,
            newAuthTokenExpiresIn: 15, // Minutes
            newRefreshToken: null, // Backend handles the refresh cookie
          };
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

export default authStore;
