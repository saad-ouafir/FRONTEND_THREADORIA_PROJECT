import GlobalStore from "../../context/GlobalStore";
export default function getToken() {
  return GlobalStore.getState().auth.accessToken;
}
