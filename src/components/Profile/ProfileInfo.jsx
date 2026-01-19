import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/formatters/formatNumber.js";
import { formatDate } from "../../utils/formatters/formatDate.js";
import { useTranslation } from "react-i18next";
import { FiCalendar, FiEdit2 } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile.js";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/profile.api.js";
import AlertMessage from "../UI/AlertMessage.jsx";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils.js";

export default function ProfileInfo({ userID }) {
  const localUser = useProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (userID) {
          const response = await getProfile(userID);
          setUser(response.user);
        } else {
          setUser(localUser);
        }
      } catch (err) {
        setError({
          message: err.message || "Failed to load profile",
          statusCode: err.status || 500,
        });
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userID, localUser]);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-muted text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <AlertMessage message={error.message} statusCode={error.statusCode} onClose={() => setError(null)} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted text-lg">Profile not found</p>
        </div>
      </div>
    );
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

            {/* Action Buttons - Only show for own profile */}
            {!userID && (
              <div className="flex gap-3 pb-2">
                <button className="p-2 rounded-full bg-bg-tertiary border border-border/70 text-text-secondary hover:bg-bg-tertiary/80 transition-colors duration-200">
                  <FiEdit2 className="w-5 h-5" />
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
                {t("profile.joined")} {user.created_at ? formatDate(user.created_at) : "Recently"}
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
