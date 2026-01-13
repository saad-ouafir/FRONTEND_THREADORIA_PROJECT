import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiRepeat } from "react-icons/fi";

const NotificationsList = ({ notifications, onMarkAsRead }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const displayedNotifications = showAllNotifications ? notifications : notifications.slice(0, 3);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <FiHeart className="w-5 h-5 text-red-500" />;
      case 'reply':
        return <FiMessageCircle className="w-5 h-5 text-green-500" />;
      case 'repost':
        return <FiRepeat className="w-5 h-5 text-purple-500" />;
      default:
        return <FiHeart className="w-5 h-5 text-gray-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <FiHeart className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-muted text-lg">{t('notifications.no_other', 'No other notifications')}</p>
        <p className="text-text-muted/70 text-sm mt-2">
          {t('notifications.no_other_desc', 'When people like, reply, or repost your content, you\'ll see it here')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-text-primary mb-3">{t('notifications.reactions', 'Reactions')}</h2>
        <div className="space-y-3">
          {displayedNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-center gap-3 p-3 bg-bg-primary rounded-lg cursor-pointer hover:bg-bg-tertiary/50 transition-colors ${
                !notification.read ? 'bg-accent/10' : ''
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <img
                src={notification.user.avatar}
                alt={notification.user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p 
                  className="text-text-primary font-medium hover:text-accent cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${notification.user.id}`);
                  }}
                >
                  {notification.user.name}
                </p>
                <p className="text-text-muted text-xs mt-1 font-semibold">{notification.messageKey ? t(notification.messageKey, notification.defaultMessage) : notification.message}</p>
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
              className="w-full p-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            >
              {t('rightbar.see_more', 'See more')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
