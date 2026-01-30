import React from "react";
import HeaderComponent from "../components/HeaderComponent";
// import NotificationsList from "../components/Notifications/NotificationsList";
import FollowsNotifications from "../components/Notifications/FollowsNotifications";
import ReactionsNotifications from "../components/Notifications/ReactionsNotifications";

export default function NotificationsLayout() {
  return (
    <div>
      <HeaderComponent page="Notifications" />
      <FollowsNotifications />
      <ReactionsNotifications />
    </div>
  );
}
