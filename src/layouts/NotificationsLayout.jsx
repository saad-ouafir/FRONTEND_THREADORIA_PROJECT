import React from "react";
import HeaderComponent from "../components/HeaderComponent";
// import NotificationsList from "../components/Notifications/NotificationsList";
import FollowNotifications from "../components/Notifications/follows/FollowNotifications";
import ReactionsNotifications from "../components/Notifications/ReactionsNotifications";

export default function NotificationsLayout() {
  return (
    <div>
      <HeaderComponent page="Notifications" />
      <FollowNotifications />
      <ReactionsNotifications />
    </div>
  );
}
