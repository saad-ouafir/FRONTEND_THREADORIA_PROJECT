import GlobalStore from "../../context/GlobalStore";
import { setProfileData } from "../../context/ProfileSlice";

export default function setProfile(userData) {
  return GlobalStore.dispatch(setProfileData(userData));
}
