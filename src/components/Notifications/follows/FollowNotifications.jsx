import { useSelector } from "react-redux";
import PublicFollowers from "./PublicFollowers";
import FollowRequestsNotifications from "./FollowRequestsNotifications";

export default function FollowNotifications() {
  const profile = useSelector(state => state.profile);

  // Render different components based on account type
  if (profile.is_private) {
    return <FollowRequestsNotifications />;
  } else {
    return <PublicFollowers />;
  }
}
