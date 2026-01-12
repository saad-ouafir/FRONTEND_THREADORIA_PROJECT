import GlobalStore from "../../context/GlobalStore";
import { clearProfileData } from "../../context/ProfileSlice";
export default function clearProfile() {
  return GlobalStore.dispatch(clearProfileData());
}
