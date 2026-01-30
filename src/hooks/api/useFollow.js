import { useState, useCallback } from "react";
import { toggleFollow, removeFollower } from "../../api/follow.api";

/**
 * Custom hook to manage follow actions with state updates
 * @param {Function} setAlert - Function to set alert messages
 * @returns {Object} - Follow action handlers and loading state
 */
export function useFollow(setAlert) {
  const [loading, setLoading] = useState(false);

  const handleToggleFollow = useCallback(
    async (userId, onSuccess) => {
      if (!userId) return null;
      setLoading(true);
      setAlert?.(null);

      try {
        const response = await toggleFollow(userId);
        setAlert?.({ message: response.message, statusCode: response.status });
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
    [setAlert]
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
    [setAlert]
  );

  return {
    toggleFollow: handleToggleFollow,
    removeFollower: handleRemoveFollower,
    loading,
  };
}
