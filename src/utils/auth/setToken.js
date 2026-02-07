// --------------------------------------
// Update the token in the global store
// --------------------------------------

import GlobalStore from "../../context/GlobalStore";
export default function setToken(token) {
  return GlobalStore.dispatch({
    type: "auth/setToken",
    payload: token,
  });
}
