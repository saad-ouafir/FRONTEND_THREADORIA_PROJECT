import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBell, FiUser, FiHeart, FiMessageCircle, FiRepeat } from "react-icons/fi";

// Sample notification data - in a real app, this would come from an API
const sampleNotifications = [
  {
    id: 1,
    type: "follow",
    user: {
      name: "Hamid Skefkef",
      username: "@hamidSkefkef",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    message: "started following you",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "like",
    user: {
      name: "Jhon Ait Doe",
      username: "@7imaroJo7a",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    message: "liked your thread",
    time: "4 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "reply",
    user: {
      name: "7adda Rodriguez",
      username: "@7adda",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    message: "replied to your thread",
    time: "6 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "repost",
    user: {
      name: "henry sanchez",
      username: "@henrySanchez",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    message: "reposted your thread",
    time: "1 day ago",
    read: true,
  },
];

export default function Notifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(sampleNotifications);

  const getNotificationIcon = type => {
    switch (type) {
      case "follow":
        return <FiUser className="w-4 h-4 text-blue-500" />;
      case "like":
        return <FiHeart className="w-4 h-4 text-red-500" />;
      case "reply":
        return <FiMessageCircle className="w-4 h-4 text-green-500" />;
      case "repost":
        return <FiRepeat className="w-4 h-4 text-purple-500" />;
      default:
        return <FiBell className="w-4 h-4 text-gray-500" />;
    }
  };

  const markAsRead = notificationId => {
    setNotifications(prev => prev.map(notif => (notif.id === notificationId ? { ...notif, read: true } : notif)));
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border p-4">
        <h1 className="text-xl font-bold text-text-primary">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-bg-tertiary/50 transition-colors cursor-pointer ${
                !notification.read ? "bg-accent/5" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                {/* Notification Icon */}
                <div className="shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                {/* User Avatar */}
                <div className="shrink-0">
                  <img src={notification.user.profile_picture_url} className="w-10 h-10 object-cover rounded-full" />
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm">
                    <span className="font-semibold">{notification.user.name}</span>{" "}
                    <span className="text-text-secondary">{notification.message}</span>
                  </p>
                  <p className="text-text-muted text-xs mt-1">{notification.time}</p>
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="shrink-0">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <FiBell className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted text-lg">No notifications yet</p>
            <p className="text-text-muted/70 text-sm mt-2">When people interact with you, you'll see it here</p>
          </div>
        )}
      </div>
    </div>
  );
}
