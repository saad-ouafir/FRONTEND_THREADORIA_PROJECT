import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import config from "../../config/config";

/**
 * useOnlineStatus - Custom hook to track online status of users via WebSocket
 * @param {number|null} currentUserId - Current user's ID (to join socket room)
 * @param {Array<number>} userIdsToTrack - Array of user IDs to track online status
 * @returns {Object} { onlineUsers, isUserOnline, checkOnlineStatus }
 */
export function useOnlineStatus(currentUserId, userIdsToTrack = []) {
  const [onlineUsers, setOnlineUsers] = useState({});
  const socketRef = useRef(null);
  const userIdsRef = useRef(userIdsToTrack);

  // Update ref when userIds change
  useEffect(() => {
    userIdsRef.current = userIdsToTrack;
  }, [userIdsToTrack]);

  // Check if specific user is online
  const isUserOnline = useCallback(
    userId => {
      return onlineUsers[userId] === true;
    },
    [onlineUsers],
  );

  // Request online status for specific users
  const checkOnlineStatus = useCallback(userIds => {
    if (socketRef.current?.connected && Array.isArray(userIds)) {
      socketRef.current.emit("check_online", userIds);
    }
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    // Initialize socket connection
    const socket = io(config.API_URL.replace("/api", ""), {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Online status socket connected");
      // Join user's room
      socket.emit("join", currentUserId);
      // Check initial online status for tracked users
      if (userIdsRef.current.length > 0) {
        socket.emit("check_online", userIdsRef.current);
      }
    });

    // Handle individual user online status updates
    socket.on("user_online", ({ userId, online }) => {
      setOnlineUsers(prev => ({
        ...prev,
        [userId]: online,
      }));
    });

    // Handle bulk online status response
    socket.on("online_status", status => {
      setOnlineUsers(prev => ({
        ...prev,
        ...status,
      }));
    });

    // Handle online users list
    socket.on("online_users_list", userIds => {
      const newOnlineUsers = {};
      userIds.forEach(id => {
        newOnlineUsers[id] = true;
      });
      setOnlineUsers(prev => ({
        ...prev,
        ...newOnlineUsers,
      }));
    });

    socket.on("disconnect", () => {
      console.log("Online status socket disconnected");
    });

    return () => {
      if (socket.connected) {
        socket.emit("leave", currentUserId);
        socket.disconnect();
      }
      socketRef.current = null;
    };
  }, [currentUserId]);

  // Request status updates when tracked user IDs change
  useEffect(() => {
    if (socketRef.current?.connected && userIdsToTrack.length > 0) {
      socketRef.current.emit("check_online", userIdsToTrack);
    }
  }, [userIdsToTrack]);

  return {
    onlineUsers,
    isUserOnline,
    checkOnlineStatus,
  };
}

export default useOnlineStatus;
