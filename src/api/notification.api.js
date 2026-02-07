//-----------------------------------
// API Methods for Notifications
//-----------------------------------

import axiosInstance from "./axiosInstance";

// Get User Notifications (recepient_id===currentUserId)
export async function getUserNotifications(params = {}) {
  const { page = 1, limit = 10 } = params;
  const response = await axiosInstance.get("/notifications", {
    params: { page, limit },
  });
  return {
    status: response.status,
    message: response.data.message,
    notifications: response.data.notifications,
    unreadCount: response.data.unreadCount,
    pagination: response.data.pagination,
  };
}

// Mark a single Notification as Read
export async function markNotificationAsRead(notificationId) {
  const response = await axiosInstance.put(`/notifications/read/${notificationId}`);
  return {
    status: response.status,
    message: response.data.message,
    notification: response.data.data,
  };
}

// Mark All Notifications as Read
export async function markAllNotificationsAsRead() {
  const response = await axiosInstance.put("/notifications/read/all");
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Delete a single Notification
export async function deleteNotification(notificationId) {
  const response = await axiosInstance.delete(`/notifications/${notificationId}`);
  return {
    status: response.status,
    message: response.data.message,
  };
}

// Clear All Notifications
export async function deleteAllNotifications() {
  const response = await axiosInstance.delete("/notifications/all");
  return {
    status: response.status,
    message: response.data.message,
    deletedCount: response.data.deletedCount,
  };
}
