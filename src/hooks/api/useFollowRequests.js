import { useState, useEffect, useCallback, useMemo } from "react";
import { acceptFollowRequest, toggleFollow, getFollowRequests, rejectFollowRequest } from "../../api/follow.api";
import submitHandler from "../../handlers/submitHandler";
import { useNotificationSocket } from "./useNotificationSocket";
import useProfile from "../states/useProfile";

/**
 * Custom hook for managing follow requests with WebSocket support
 * Separates business logic from UI components
 * @returns {Object} Follow request state and handlers
 */
export function useFollowRequests() {
  const [alert, setAlert] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useProfile();

  // Clear alert
  const clearAlert = useCallback(() => setAlert(null), []);

  // Fetch follow requests function
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getFollowRequests();
      setRequests(response.followRequests || []);
    } catch (error) {
      setAlert({ message: error.message || "Failed to fetch requests", statusCode: error.status || 500 });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch follow requests on mount
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // WebSocket handlers for real-time updates
  const socketHandlers = useMemo(
    () => ({
      onNewNotification: notification => {
        // Refresh follow requests when a FOLLOW_REQUEST notification arrives
        if (notification?.type === "FOLLOW_REQUEST" || notification?.type === "FOLLOW") {
          fetchRequests();
        }
      },
      onCancelNotification: data => {
        // Remove from list if follow request is cancelled
        if (data?.type === "FOLLOW_REQUEST" || data?.type === "FOLLOW") {
          setRequests(prev => prev.filter(r => r.follower_id !== data.sender_id));
        }
      },
    }),
    [fetchRequests],
  );

  // Connect to WebSocket for real-time follow request updates
  useNotificationSocket(currentUser?.id, socketHandlers);

  // Remove request from local state after action
  const removeRequest = useCallback(followerId => {
    setRequests(prev => prev.filter(r => r.follower_id !== followerId));
  }, []);

  // Handle Accept follow request
  const handleAccept = useCallback(
    async followerId => {
      const result = await submitHandler(setAlert, acceptFollowRequest, followerId);
      if (result) {
        removeRequest(followerId);
      }
      return result;
    },
    [removeRequest],
  );

  // Handle Reject follow request
  const handleReject = useCallback(
    async followerId => {
      const result = await submitHandler(setAlert, rejectFollowRequest, followerId);
      if (result) {
        removeRequest(followerId);
      }
      return result;
    },
    [removeRequest],
  );

  // Handle Follow back
  const handleFollow = useCallback(async followerId => {
    const result = await submitHandler(setAlert, toggleFollow, followerId);
    return result;
  }, []);

  return {
    // State
    requests,
    loading,
    alert,
    // Actions
    handleAccept,
    handleReject,
    handleFollow,
    clearAlert,
    refresh: fetchRequests,
  };
}

export default useFollowRequests;
