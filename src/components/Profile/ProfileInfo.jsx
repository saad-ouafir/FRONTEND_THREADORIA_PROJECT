import { useState, useEffect, useId, useMemo, useRef } from "react";
import { formatNumber } from "../../utils/formatters/formatNumber.js";
import { formatDate } from "../../utils/formatters/formatDate.js";
import { useTranslation } from "react-i18next";
import { FiCalendar } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile.js";
import { useNavigate } from "react-router-dom";
import { toggleFollow } from "../../api/follow.api.js";
import AlertMessage from "../UI/AlertMessage.jsx";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils.js";
import submitHandler from "../../handlers/submitHandler.js";
import { useProfileContext } from "../../hooks/context/useProfileContext.js";
import { useFollowSync } from "../../hooks/api/useFollowSyncHook.js";
import { useOnlineStatus } from "../../hooks/api/useOnlineStatus.js";

export default function ProfileInfo({ userID }) {
  const localUser = useProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const idToUse = userID || localUser?.id;
  const { subscribe, notifyFollowChange } = useFollowSync();
  const componentId = useId();

  const { profileData: user, loading, error, fetchProfile } = useProfileContext();

  // Derive followStatus from user data, with local override for optimistic updates
  const [localFollowStatus, setLocalFollowStatus] = useState(null);
  const followStatus = localFollowStatus ?? user?.followStatus ?? null;
  const setFollowStatus = setLocalFollowStatus;

  // Derive alert from error
  const alert = useMemo(() => (error ? { message: error, statusCode: 500 } : null), [error]);
  const setAlert = useState(null)[1]; // Keep setAlert for submitHandler compatibility

  // Track user id to reset local follow status when profile changes
  const prevUserIdRef = useRef(user?.id);
  if (user?.id !== prevUserIdRef.current) {
    prevUserIdRef.current = user?.id;
    if (localFollowStatus !== null) {
      // Schedule state update for next render
      Promise.resolve().then(() => setLocalFollowStatus(null));
    }
  }

  useEffect(() => {
    if (idToUse) {
      fetchProfile(idToUse);
    }
  }, [idToUse, fetchProfile]);

  // Subscribe to follow status changes from other components
  useEffect(() => {
    if (!userID) return;

    const unsubscribe = subscribe(componentId, (userId, newFollowStatus) => {
      if (parseInt(userId) === parseInt(userID)) {
        setFollowStatus(newFollowStatus);
      }
    });
    return unsubscribe;
  }, [subscribe, componentId, userID, setFollowStatus]);

  // Track online status of the profile user
  const userIdsToTrack = useMemo(() => (userID ? [parseInt(userID)] : []), [userID]);
  const { isUserOnline } = useOnlineStatus(localUser?.id, userIdsToTrack);
  const profileUserOnline = userID ? isUserOnline(parseInt(userID)) : true; // Current user is always online

  if (!idToUse) {
    return (
      <div className="h-screen w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-muted text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleFollowToggle = async () => {
    const response = await submitHandler(setAlert, toggleFollow, parseInt(userID));
    const newStatus = response?.followStatus || null;
    setFollowStatus(newStatus);
    // Notify other components about the follow status change
    notifyFollowChange(parseInt(userID), newStatus);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-muted text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.id) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted text-lg">Profile not found</p>
        </div>
      </div>
    );
  }

  let buttonText, buttonClass;
  if (followStatus === "PENDING") {
    buttonText = "Pending";
    buttonClass = "bg-gray-500 text-white hover:bg-gray-600";
  } else if (followStatus === "ACCEPTED") {
    buttonText = "Following";
    buttonClass = "bg-bg-tertiary border border-border/70 text-text-secondary hover:bg-bg-tertiary/80";
  } else {
    buttonText = "Follow";
    buttonClass = "bg-accent text-white hover:bg-accent/90";
  }

  return (
    <div className="h-full w-full bg-bg-primary">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <div className="w-full bg-bg-secondary overflow-hidden">
        <div className="relative h-32 md:h-44 bg-linear-to-r from-accent/40 via-accent/20 to-accent/40" />
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="relative flex justify-between items-end -mt-16 md:-mt-20 mb-4">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg border-4 border-bg-secondary">
                {getValidProfilePictureUrl(user.profile_picture_url) ? (
                  <img
                    src={getValidProfilePictureUrl(user.profile_picture_url)}
                    alt={user.full_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl md:text-3xl font-bold">{getUserInitials(user)}</span>
                )}
              </div>
              {/* Online status indicator */}
              {profileUserOnline && (
                <div
                  className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-secondary"
                  title="Online"
                />
              )}
            </div>

            {/* Follow Button - Only show for other users */}
            {userID && localUser && localUser.id !== user?.id && (
              <div className="flex gap-3 pb-2">
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${buttonClass}`}
                >
                  {/* {followLoading ? "Loading..." : buttonText} */}
                  {buttonText}
                </button>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{user.full_name || "Unknown User"}</h1>
            <p className="text-text-muted text-base">@{user.username || "user"}</p>
          </div>

          {/* Bio */}
          {user.bio && <p className="text-text-secondary text-base leading-relaxed mb-4">{user.bio}</p>}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-text-muted text-sm mb-5">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              <span>
                {t("profile.joined")} {formatDate(user.created_at)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 border-border">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-text-primary">{formatNumber(user.posts_count || 0)}</span>
              <span className="text-text-muted">{t("profile.posts")}</span>
            </div>
            <button className="flex items-center gap-1.5 hover:underline" onClick={() => navigate("followings")}>
              <span className="font-bold text-text-primary">{formatNumber(user.following_count || 0)}</span>
              <span className="text-text-muted">{t("profile.following")}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:underline" onClick={() => navigate("followers")}>
              <span className="font-bold text-text-primary">{formatNumber(user.follower_count || 0)}</span>
              <span className="text-text-muted">{t("profile.followers")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
