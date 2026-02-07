import { useCallback, useRef } from "react";
import { FollowSyncContext } from "./followSyncContext.js";

// Context provider for follow status synchronization in multiple components
export function FollowSyncProvider({ children }) {
  // Store listeners as refs to avoid re-renders
  const listenersRef = useRef(new Map());

  // Register a listener for follow status changes
  const subscribe = useCallback((componentId, callback) => {
    listenersRef.current.set(componentId, callback);
    // Return unsubscribe function
    return () => {
      listenersRef.current.delete(componentId);
    };
  }, []);

  // Notify all listeners about a follow status change
  const notifyFollowChange = useCallback((userId, newFollowStatus) => {
    listenersRef.current.forEach(callback => {
      callback(userId, newFollowStatus);
    });
  }, []);

  const value = {
    subscribe,
    notifyFollowChange,
  };

  return <FollowSyncContext.Provider value={value}>{children}</FollowSyncContext.Provider>;
}

export default FollowSyncProvider;
