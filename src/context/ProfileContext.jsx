import { createContext, useState, useCallback } from "react";
import { getProfile } from "../api/profile.api";

export const ProfileContext = createContext(null);

export function ProfileProvider({ children, userID }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async id => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await getProfile(id);
      setProfileData(response.user);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFollowerCount = useCallback(delta => {
    setProfileData(prev =>
      prev
        ? {
            ...prev,
            follower_count: Math.max(0, (prev.follower_count || 0) + delta),
          }
        : prev,
    );
  }, []);

  const updateFollowingCount = useCallback(delta => {
    setProfileData(prev =>
      prev
        ? {
            ...prev,
            following_count: Math.max(0, (prev.following_count || 0) + delta),
          }
        : prev,
    );
  }, []);

  const refreshProfile = useCallback(() => {
    if (userID) {
      fetchProfile(userID);
    }
  }, [userID, fetchProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        loading,
        error,
        fetchProfile,
        refreshProfile,
        updateFollowerCount,
        updateFollowingCount,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
