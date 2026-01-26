import axiosInstance from "./axiosInstance";

export async function getUserNotifications() {
  const response = await axiosInstance.get("/notifications");
  return {
    status: response.status,
    message: response.data.message,
    notifications: response.data.notifications,
    unreadCount: response.data.unreadCount,
  };
}

export async function markNotificationAsRead(notificationId) {
  const response = await axiosInstance.put(`/notifications/read/${notificationId}`);
  return {
    status: response.status,
    message: response.data.message,
    notification: response.data.data,
  };
}

export async function markAllNotificationsAsRead() {
  const response = await axiosInstance.put("/notifications/read/all");
  return {
    status: response.status,
    message: response.data.message,
  };
}

export async function deleteNotification(notificationId) {
  const response = await axiosInstance.delete(`/notifications/${notificationId}`);
  return {
    status: response.status,
    message: response.data.message,
  };
}
