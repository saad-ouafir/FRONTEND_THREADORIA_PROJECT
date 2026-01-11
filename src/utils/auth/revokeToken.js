import GlobalStore from "../../context/GlobalStore";
export default function revokeToken() {
  return GlobalStore.dispatch({
    type: "auth/revokeToken",
  });
}
