import { useSelector } from "react-redux";
import PublicFollowers from "./follows/PublicFollowers";
import FollowRequestsNotifications from "./follows/FollowRequestsNotifications";

export default function FollowNotifications() {
  const profile = useSelector(state => state.profile);

  // Render different components based on account type
  if (profile.is_private) {
    return <FollowRequestsNotifications />;
  } else {
    return <PublicFollowers />;
  }
}
