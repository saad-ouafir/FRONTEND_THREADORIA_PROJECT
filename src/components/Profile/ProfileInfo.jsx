import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/formatters/formatNumber.js";
import { formatDate } from "../../utils/formatters/formatDate.js";
import { useTranslation } from "react-i18next";
import { FiCalendar } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile.js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/profile.api.js";
import { followUser, unfollowUser } from "../../api/follow.api.js";
import AlertMessage from "../UI/AlertMessage.jsx";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils.js";
import { useFetch } from "../../hooks/api/useFetch.js";

export default function ProfileInfo({ userID }) {
  const localUser = useProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followStatus, setFollowStatus] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);

  const idToUse = userID || localUser?.id;
  const fetchedData = useFetch(setAlert, getProfile, idToUse);
  const user = fetchedData.user;
  console.log(user);
  useEffect(() => {
    if (user && !user.loading) {
      // setIsFollowing(user.isFollowing || false);
      setFollowStatus(user.followStatus || null);
    }
  }, [user]);

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
    if (!user || !localUser || followLoading || followStatus === "PENDING") return;

    try {
      setFollowLoading(true);
      if (isFollowing) {
        await unfollowUser({ userId: user.id });
        setIsFollowing(false);
        setFollowStatus(null);
      } else {
        await followUser({ followingId: user.id });
        setIsFollowing(true);
        setFollowStatus("PENDING"); // Assuming it becomes pending after follow
      }
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
      // Optionally set alert or handle error
    } finally {
      setFollowLoading(false);
    }
  };

  if (fetchedData.loading) {
    return (
      <div className="h-screen w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-muted text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (alert) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />
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

  let buttonText, buttonDisabled, buttonClass;
  if (followStatus === "PENDING") {
    buttonText = "Pending";
    buttonDisabled = true;
    buttonClass = "bg-gray-500 text-white cursor-not-allowed";
  } else if (isFollowing) {
    buttonText = "Following";
    buttonDisabled = false;
    buttonClass = "bg-bg-tertiary border border-border/70 text-text-secondary hover:bg-bg-tertiary/80";
  } else {
    buttonText = "Follow";
    buttonDisabled = false;
    buttonClass = "bg-accent text-white hover:bg-accent/90";
  }

  return (
    <div className="h-full w-full bg-bg-primary">
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
              {/* Only show online status for current user */}
              {!userID && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-secondary" />
              )}
            </div>

            {/* Follow Button - Only show for other users */}
            {userID && localUser && localUser.id !== user?.id && (
              <div className="flex gap-3 pb-2">
                <button
                  onClick={handleFollowToggle}
                  disabled={buttonDisabled || followLoading}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${buttonClass} ${followLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {followLoading ? "Loading..." : buttonText}
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
