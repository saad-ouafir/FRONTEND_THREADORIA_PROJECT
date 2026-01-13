import { useTranslation } from "react-i18next";

const NotificationHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-bg-secondary border-b border-border p-4">
      <h1 className="text-xl font-bold text-text-primary">{t('notifications.title', 'Notifications')}</h1>
    </div>
  );
};

export default NotificationHeader;
