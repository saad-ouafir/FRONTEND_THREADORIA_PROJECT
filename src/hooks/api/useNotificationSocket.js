import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import config from "../../config/config";

export function useNotificationSocket(userId, handlers = {}) {
  const socketRef = useRef(null);
  const handlersRef = useRef(handlers);

  // Keep handlers ref updated without triggering reconnection
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Initialize socket connection - only depends on userId
  useEffect(() => {
    if (!userId) return;

    // Extract base URL from API URL (remove /api suffix if present)
    const baseUrl = config.API_URL?.replace(/\/api\/?$/, "") || window.location.origin;

    // Create socket connection
    socketRef.current = io(baseUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    // Join user's notification room
    socket.on("connect", () => {
      console.log("Connected to notification socket");
      socket.emit("join", userId);
    });

    // Handle new notification
    socket.on("new_notification", notification => {
      console.log("New notification received:", notification);
      handlersRef.current.onNewNotification?.(notification);
    });

    // Handle cancelled notification
    socket.on("cancel_notification", data => {
      console.log("Notification cancelled:", data);
      handlersRef.current.onCancelNotification?.(data);
    });

    // Handle notification update
    socket.on("update_notification", data => {
      console.log("Notification updated:", data);
      handlersRef.current.onUpdateNotification?.(data);
    });

    // Handle connection errors
    socket.on("connect_error", error => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", reason => {
      console.log("Disconnected from notification socket:", reason);
    });

    // Cleanup on unmount or userId change
    return () => {
      if (socket) {
        socket.emit("leave", userId);
        socket.disconnect();
      }
    };
  }, [userId]); // Only reconnect when userId changes

  // Manual reconnect function
  const reconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.connect();
    }
  }, []);

  // Check if connected
  const isConnected = useCallback(() => {
    return socketRef.current?.connected || false;
  }, []);

  // Get socket instance (for use in callbacks/effects only)
  const getSocket = useCallback(() => {
    return socketRef.current;
  }, []);

  return {
    getSocket,
    reconnect,
    isConnected,
  };
}

export default useNotificationSocket;
