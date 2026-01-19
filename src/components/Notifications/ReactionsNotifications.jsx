import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiRepeat, FiChevronDown, FiChevronUp } from "react-icons/fi";

// Mock test data for reactions notifications
const mockReactionsNotifications = [
  {
    id: 1,
    type: "like",
    user: {
      id: 201,
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    message: "liked your thread",
    messageKey: "notifications.liked_thread",
    defaultMessage: "liked your thread",
    read: false,
    timestamp: "2h ago",
  },
  {
    id: 2,
    type: "reply",
    user: {
      id: 202,
      name: "Frank Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    message: "replied to your thread",
    messageKey: "notifications.replied_thread",
    defaultMessage: "replied to your thread",
    read: false,
    timestamp: "4h ago",
  },
  {
    id: 3,
    type: "share",
    user: {
      id: 203,
      name: "Grace Lee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    message: "shared your thread",
    messageKey: "notifications.shared_thread",
    defaultMessage: "shared your thread",
    read: true,
    timestamp: "6h ago",
  },
  {
    id: 4,
    type: "like",
    user: {
      id: 204,
      name: "Henry Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    message: "liked your thread",
    messageKey: "notifications.liked_thread",
    defaultMessage: "liked your thread",
    read: false,
    timestamp: "8h ago",
  },
  {
    id: 5,
    type: "reply",
    user: {
      id: 205,
      name: "Ivy Chen",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    message: "replied to your thread",
    messageKey: "notifications.replied_thread",
    defaultMessage: "replied to your thread",
    read: true,
    timestamp: "12h ago",
  },
  {
    id: 6,
    type: "share",
    user: {
      id: 206,
      name: "Jack Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    message: "shared your thread",
    messageKey: "notifications.shared_thread",
    defaultMessage: "shared your thread",
    read: false,
    timestamp: "1d ago",
  },
  {
    id: 7,
    type: "like",
    user: {
      id: 207,
      name: "Kate Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    message: "liked your thread",
    messageKey: "notifications.liked_thread",
    defaultMessage: "liked your thread",
    read: true,
    timestamp: "2d ago",
  },
];

export default function ReactionsNotifications() {
  const notifications = mockReactionsNotifications;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 3);

  const onMarkAsRead = notificationId => {
    // In a real app, this would update the notification status
    console.log("Marking notification as read:", notificationId);
  };

  const getNotificationIcon = type => {
    switch (type) {
      case "like":
        return <FiHeart className="w-5 h-5 text-red-500" />;
      case "reply":
        return <FiMessageCircle className="w-5 h-5 text-blue-500" />;
      case "share":
        return <FiRepeat className="w-5 h-5 text-green-500" />;
      default:
        return <FiHeart className="w-5 h-5 text-gray-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <FiHeart className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-muted text-lg">{t("notifications.no_other", "No other notifications")}</p>
        <p className="text-text-muted/70 text-sm mt-2">
          {t("notifications.no_other_desc", "When people like, reply, or repost your content, you'll see it here")}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-text-primary mb-3">{t("notifications.reactions", "Reactions")}</h2>
        <div className="space-y-3">
          {displayedNotifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 p-3 bg-bg-primary rounded-lg cursor-pointer hover:bg-bg-tertiary/50 transition-colors ${
                !notification.read ? "bg-accent/10" : ""
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="shrink-0">{getNotificationIcon(notification.type)}</div>
              <img
                src={notification.user.avatar}
                alt={notification.user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-text-primary font-medium hover:text-accent cursor-pointer transition-colors"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/profile/${notification.user.id}`);
                  }}
                >
                  {notification.user.name}
                </p>
                <p className="text-text-muted text-xs mt-1 font-semibold">
                  {notification.messageKey
                    ? t(notification.messageKey, notification.defaultMessage)
                    : notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="shrink-0">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
              )}
            </div>
          ))}
          {notifications.length > 3 && (
            <button
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="w-full mt-4 py-2 px-4 bg-bg-primary hover:bg-bg-tertiary border border-border hover:border-accent/30 text-accent hover:text-accent-hover text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
            >
              {showAllNotifications ? (
                <>
                  <FiChevronUp className="w-4 h-4" />
                  {t("rightbar.see_less", "See less")}
                </>
              ) : (
                <>
                  <FiChevronDown className="w-4 h-4" />
                  <span>{t("rightbar.see_more", "See more")}</span>
                  <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">
                    {notifications.length - 3}
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
