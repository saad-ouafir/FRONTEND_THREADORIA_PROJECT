import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiRepeat, FiChevronDown, FiChevronUp, FiUser, FiShare2 } from "react-icons/fi";
import { useFetch } from "../../hooks/api/useFetch";
import AlertMessage from "../UI/AlertMessage";
import { getUserNotifications } from "../../api/notification.api";
// import submitHandler from "../../handlers/submitHandler";

export default function ReactionsNotifications() {
  const [alert, setAlert] = useState(null);
  const response = useFetch(setAlert, getUserNotifications, null);
  const notifications = response?.notifications || [];
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 3);

  const getNotificationIcon = type => {
    switch (type.toLowerCase()) {
      case "like":
        return <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />;
      case "reply":
        return <FiMessageCircle className="w-5 h-5 text-blue-500" />;
      case "share":
        return <FiShare2 className="w-5 h-5 fill-green-500 text-green-500" />;
      case "follow":
        return <FiUser className="w-5 h-5 fill-purple-500 text-purple-500" />;
      case "follow_request":
        return <FiUser className="w-5 h-5 fill-purple-500 text-purple-500" />;
      case "follow_accept":
        return <FiUser className="w-5 h-5 fill-purple-500 text-purple-500" />;
      default:
        return <FiHeart className="w-5 h-5 text-purple-500" />;
    }
  };

  const getNotificationMessage = type => {
    switch (type.toLowerCase()) {
      case "like":
        return `liked your post`;
      case "reply":
        return `replied to your post`;
      case "share":
        return `shared your post`;
      case "follow":
        return `followed you`;
      case "follow_request":
        return `sent you a follow request`;
      case "follow_accept":
        return `accepted your follow request`;
      default:
        return `interacted with your post`;
    }
  };

  const formatTimeAgo = dateString => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-bg-secondary border-b border-border">
        <div className="p-8 text-center">
          <FiHeart className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted text-lg">{t("notifications.no_other", "No other notifications")}</p>
          <p className="text-text-muted/70 text-sm mt-2">
            {t("notifications.no_other_desc", "When people like, reply, or repost your content, you'll see it here")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-text-primary">{t("notifications.reactions", "Reactions")}</h2>
            {notifications.filter(n => !n.is_read).length > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                {notifications.filter(n => !n.is_read).length}
              </span>
            )}
          </div>
        </div>

        {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}

        <div className="space-y-2">
          {displayedNotifications.map(notification => (
            <ReactionNotificationItem
              key={notification.id}
              notification={notification}
              navigate={navigate}
              getNotificationIcon={getNotificationIcon}
              getNotificationMessage={getNotificationMessage}
              formatTimeAgo={formatTimeAgo}
            />
          ))}
        </div>

        {notifications.length > 10 && (
          <button
            onClick={() => setShowAllNotifications(!showAllNotifications)}
            className="w-fit m-auto mt-4 py-2 px-4 bg-blue-500 hover:bg-bg-tertiary border border-border hover:border-accent/30 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
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
                  {notifications.length - 10}
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Reaction Notification Item Component
function ReactionNotificationItem({
  notification,
  navigate,
  getNotificationIcon,
  getNotificationMessage,
  formatTimeAgo,
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-bg-primary border border-border hover:border-accent/30 transition-colors rounded-lg relative cursor-pointer ${
        !notification.is_read ? "bg-accent/5 border-accent/20" : ""
      }`}
    >
      {!notification.is_read && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
      <div className="shrink-0">
        {notification.sender.profile_picture_url ? (
          <img
            src={notification.sender.profile_picture_url}
            alt={notification.sender.full_name || notification.sender.username}
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-bg-tertiary rounded-full flex items-center justify-center">
            <FiUser className="w-5 h-5 text-text-muted" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <p
              className="font-medium text-text-primary hover:text-accent transition-colors truncate cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                navigate(`/profile/${notification.sender.id}`);
              }}
            >
              {notification.sender.full_name || notification.sender.username}
            </p>
            <span className="text-text-secondary text-sm shrink-0">|</span>
            <div className="shrink-0">{getNotificationIcon(notification.type)}</div>
            <span className="text-text-secondary text-sm truncate">
              {getNotificationMessage(notification.type, notification.sender)}
            </span>
          </div>
          <div className="shrink-0 ml-2">
            <p className="text-text-muted text-xs whitespace-nowrap">{formatTimeAgo(notification.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
