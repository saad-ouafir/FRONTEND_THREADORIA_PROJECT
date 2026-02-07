import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiUser, FiShare2, FiCheck, FiTrash2, FiCheckCircle } from "react-icons/fi";

// API functions
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteAllNotifications,
} from "../../api/notification.api";

// Custom hooks
import { usePaginatedFetch } from "../../hooks/api/usePaginatedFetch";
import { useNotificationSocket } from "../../hooks/api/useNotificationSocket";
import useProfile from "../../hooks/states/useProfile";

// Handlers
import submitHandler from "../../handlers/submitHandler";

// UI Components
import AlertMessage from "../UI/AlertMessage";
import Pagination from "../UI/Pagination";
import ConfirmationBox from "../UI/ConfirmationBox";

// Utils
import { formatTimeAgo } from "../../utils/formatters/formatTimeAgo";

export default function ReactionsNotifications() {
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useProfile();

  // Use paginated fetch hook
  const {
    data: notifications,
    loading,
    pagination,
    goToPage,
    refresh,
  } = usePaginatedFetch(setAlert, getUserNotifications, {}, 10);

  // Local state for tracking read status (optimistic updates)
  const [localReadStatus, setLocalReadStatus] = useState({});

  // State for confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // WebSocket handlers - memoized to prevent unnecessary re-renders
  const socketHandlers = useMemo(
    () => ({
      onNewNotification: () => {
        // Refresh notifications when a new one arrives
        refresh();
      },
      onCancelNotification: () => {
        // Refresh when a notification is cancelled
        refresh();
      },
    }),
    [refresh],
  );

  // Connect to WebSocket for real-time notifications
  useNotificationSocket(currentUser?.id, socketHandlers);

  // Calculate unread count considering local optimistic updates
  const unreadCount = notifications.filter(n => !n.is_read && !localReadStatus[n.id]).length;

  // Get the target URL based on notification type
  const getNotificationTargetUrl = notification => {
    const type = notification.type.toLowerCase();

    switch (type) {
      case "like":
      case "reply":
      case "share":
        // Navigate to the thread/post
        return notification.target_id ? `/thread/${notification.target_id}` : null;
      case "follow":
      case "follow_request":
      case "follow_accept":
        // Navigate to the sender's profile
        return `/profile/${notification.sender.id}`;
      default:
        return notification.target_id ? `/thread/${notification.target_id}` : null;
    }
  };

  // Handle marking single notification as read
  const handleMarkAsRead = useCallback(
    async notificationId => {
      // Optimistic update
      setLocalReadStatus(prev => ({ ...prev, [notificationId]: true }));

      const result = await submitHandler(setAlert, markNotificationAsRead, notificationId);

      if (!result) {
        // Revert optimistic update on failure
        setLocalReadStatus(prev => {
          const updated = { ...prev };
          delete updated[notificationId];
          return updated;
        });
      }

      return result;
    },
    [setAlert],
  );

  // Handle marking all notifications as read
  const handleMarkAllAsRead = useCallback(async () => {
    const result = await submitHandler(setAlert, markAllNotificationsAsRead);
    if (result) {
      // Mark all as read locally
      const allRead = {};
      notifications.forEach(n => {
        allRead[n.id] = true;
      });
      setLocalReadStatus(prev => ({ ...prev, ...allRead }));
      // Refresh to get updated data
      refresh();
    }
  }, [setAlert, notifications, refresh]);

  // Handle deleting all notifications
  const handleDeleteAll = useCallback(async () => {
    const result = await submitHandler(setAlert, deleteAllNotifications);
    if (result) {
      refresh();
    }
  }, [setAlert, refresh]);

  // Open delete confirmation dialog
  const openDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  // Handle notification click - mark as read and navigate
  const handleNotificationClick = useCallback(
    async notification => {
      // Mark as read if not already
      if (!notification.is_read && !localReadStatus[notification.id]) {
        await handleMarkAsRead(notification.id);
      }

      // Navigate based on notification type
      const targetUrl = getNotificationTargetUrl(notification);
      if (targetUrl) {
        navigate(targetUrl);
      }
    },
    [handleMarkAsRead, localReadStatus, navigate],
  );

  // Get notification icon based on type
  const getNotificationIcon = type => {
    switch (type.toLowerCase()) {
      case "like":
        return <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />;
      case "reply":
        return <FiMessageCircle className="w-5 h-5 text-blue-500" />;
      case "share":
        return <FiShare2 className="w-5 h-5 fill-green-500 text-green-500" />;
      case "follow":
      case "follow_request":
      case "follow_accept":
        return <FiUser className="w-5 h-5 fill-purple-500 text-purple-500" />;
      default:
        return <FiHeart className="w-5 h-5 text-purple-500" />;
    }
  };

  // Get notification message based on type
  const getNotificationMessage = type => {
    switch (type.toLowerCase()) {
      case "like":
        return t("notifications.liked_post", "liked your post");
      case "reply":
        return t("notifications.replied_post", "replied to your post");
      case "share":
        return t("notifications.shared_post", "shared your post");
      case "follow":
        return t("notifications.followed_you", "followed you");
      case "follow_request":
        return t("notifications.follow_request", "sent you a follow request");
      case "follow_accept":
        return t("notifications.follow_accept", "accepted your follow request");
      default:
        return t("notifications.interacted", "interacted with your post");
    }
  };

  // Loading state
  if (loading && notifications.length === 0) {
    return (
      <div className="bg-bg-secondary border-b border-border p-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && notifications.length === 0) {
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
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-text-primary">{t("notifications.reactions", "Reactions")}</h2>
            {unreadCount > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">{unreadCount}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllAsRead}
              disabled={loading || unreadCount === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-accent border border-border hover:border-accent/30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title={t("notifications.mark_all_read", "Mark all as read")}
            >
              <FiCheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t("notifications.mark_all_read", "Mark all as read")}</span>
            </button>
            <button
              onClick={openDeleteConfirm}
              disabled={loading || notifications.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-red-500 border border-border hover:border-red-500/30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title={t("notifications.clear_all", "Clear all")}
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("notifications.clear_all", "Clear all")}</span>
            </button>
          </div>
        </div>

        {/* Alert Message */}
        {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}

        {/* Notifications List */}
        <div className="space-y-2">
          {notifications.map(notification => (
            <ReactionNotificationItem
              key={notification.id}
              notification={notification}
              isRead={notification.is_read || localReadStatus[notification.id]}
              onClick={() => handleNotificationClick(notification)}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
              getNotificationIcon={getNotificationIcon}
              getNotificationMessage={getNotificationMessage}
              getNotificationTargetUrl={getNotificationTargetUrl}
              navigate={navigate}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 border-t border-border pt-4">
          <Pagination pagination={pagination} onPageChange={goToPage} loading={loading} showInfo={true} />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <ConfirmationBox
          message={t("notifications.confirm_delete_all", "Are you sure you want to delete all notifications?")}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteAll}
        />
      )}
    </div>
  );
}

// Reaction Notification Item Component
function ReactionNotificationItem({
  notification,
  isRead,
  onClick,
  onMarkAsRead,
  getNotificationIcon,
  getNotificationMessage,
  getNotificationTargetUrl,
  navigate,
}) {
  const targetUrl = getNotificationTargetUrl(notification);

  return (
    <Link
      to={targetUrl || "#"}
      onClick={e => {
        if (!targetUrl) {
          e.preventDefault();
        }
        onClick();
      }}
      className={`flex items-center gap-3 p-3 bg-bg-primary border border-border hover:border-accent/30 transition-colors rounded-lg relative cursor-pointer ${
        !isRead ? "bg-accent/5 border-accent/20" : ""
      }`}
    >
      {/* Unread indicator */}
      {!isRead && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>}

      {/* Profile Picture */}
      <div className="shrink-0">
        {notification.sender?.profile_picture_url ? (
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <p
              className="font-medium text-text-primary hover:text-accent transition-colors truncate cursor-pointer"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/profile/${notification.sender.id}`);
              }}
            >
              {notification.sender?.full_name || notification.sender?.username}
            </p>
            <span className="text-text-secondary text-sm shrink-0">|</span>
            <div className="shrink-0">{getNotificationIcon(notification.type)}</div>
            <span className="text-text-secondary text-sm truncate">{getNotificationMessage(notification.type)}</span>
          </div>
          <div className="shrink-0 ml-2 flex items-center gap-2">
            <p className="text-text-muted text-xs whitespace-nowrap">{formatTimeAgo(notification.created_at)}</p>
            {/* Mark as read button */}
            {!isRead && (
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMarkAsRead();
                }}
                className="p-1 hover:bg-bg-tertiary rounded-full transition-colors"
                title="Mark as read"
              >
                <FiCheck className="w-4 h-4 text-text-muted hover:text-accent" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
