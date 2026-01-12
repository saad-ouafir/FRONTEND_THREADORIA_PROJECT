import { useSelector } from "react-redux";

export default function useProfile() {
  return useSelector(state => state.profile);
}
