import { useState, useCallback } from "react";
import { toggleFollow, removeFollower } from "../../api/follow.api";
import { useFollowSync } from "./useFollowSyncHook.js";

export function useFollow(setAlert) {
  const [loading, setLoading] = useState(false);
  const { notifyFollowChange } = useFollowSync();

  const handleToggleFollow = useCallback(
    async (userId, onSuccess) => {
      if (!userId) return null;
      setLoading(true);
      setAlert?.(null);

      try {
        const response = await toggleFollow(userId);
        setAlert?.({ message: response.message, statusCode: response.status });
        
        // Notify all subscribed components about the follow status change
        notifyFollowChange(userId, response.followStatus);
        
        onSuccess?.(response);
        return response;
      } catch (error) {
        setAlert?.({
          message: error.message || "Failed to update follow status",
          statusCode: error.status || 500,
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setAlert, notifyFollowChange],
  );

  const handleRemoveFollower = useCallback(
    async (userId, onSuccess) => {
      if (!userId) return null;
      setLoading(true);
      setAlert?.(null);

      try {
        const response = await removeFollower(userId);
        setAlert?.({ message: response.message, statusCode: response.status });
        onSuccess?.(response);
        return response;
      } catch (error) {
        setAlert?.({
          message: error.message || "Failed to remove follower",
          statusCode: error.status || 500,
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setAlert],
  );

  return {
    toggleFollow: handleToggleFollow,
    removeFollower: handleRemoveFollower,
    loading,
  };
}
