// --------------------------------------
// Update the user profile in the global store and localstorage
// --------------------------------------

import GlobalStore from "../../context/GlobalStore";
import { setProfileData } from "../../context/ProfileSlice";

export default function setProfile(userData) {
  return GlobalStore.dispatch(setProfileData(userData));
}
