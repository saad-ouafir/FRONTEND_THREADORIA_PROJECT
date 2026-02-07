// --------------------------------------
// Get the token from the global store
// --------------------------------------

import GlobalStore from "../../context/GlobalStore";
export default function getToken() {
  return GlobalStore.getState().auth;
}
