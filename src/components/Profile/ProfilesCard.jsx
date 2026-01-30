import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiUser, FiUsers, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { followUser, unfollowUser } from "../../api/follow.api";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";
import submitHandler from "../../handlers/submitHandler";

export default function ProfilesCard({ fetchedUsers, title = "Profiles" }) {
  const { t } = useTranslation();
  const [following, setFollowing] = useState(new Set());
  const [requested, setRequested] = useState(new Set());
  const [alertMessage, setAlertMessage] = useState(null);

  console.log("fetched uers", fetchedUsers);
  const handleFollow = async userId => {
    try {
      if (following.has(userId)) {
        // Unfollow
        await unfollowUser({ followingId: userId });
        setFollowing(prev => {
          const newFollowing = new Set(prev);
          newFollowing.delete(userId);
          return newFollowing;
        });
      } else {
        // Follow
        await followUser({ followingId: userId });
        setFollowing(prev => new Set([...prev, userId]));
      }
    } catch (error) {
      setAlertMessage({
        message: error.message || "Failed to update follow status",
        statusCode: error.status || 500,
      });
    }
  };

  const handleRequest = async userId => {
    try {
      if (requested.has(userId)) {
        await unfollowUser({ followingId: userId });
        setRequested(prev => {
          const newRequested = new Set(prev);
          newRequested.delete(userId);
          return newRequested;
        });
      } else {
        // Send follow request
        await followUser({ followingId: userId });
        setRequested(prev => new Set([...prev, userId]));
      }
    } catch (error) {
      setAlertMessage({
        message: error.message || "Failed to update follow request",
        statusCode: error.status || 500,
      });
    }
  };

  // const handleRequest=()=>{await submitHandler(setAlertMessage,)}

  return (
    <div className="w-full p-4 sm:p-6">
      {alertMessage && (
        <AlertMessage
          message={alertMessage.message}
          statusCode={alertMessage.statusCode}
          onClose={() => setAlertMessage(null)}
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{title}</h1>
        <div className="w-12 h-0.5 bg-accent rounded-full"></div>
      </div>

      {!fetchedUsers || fetchedUsers.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
            <FiUsers className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t("search.no_users_found")}</h3>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {fetchedUsers.map((user, index) => (
            <Link
              key={user.id || index}
              to={`/profile/${user.id}`}
              className="block group p-4 sm:p-5 rounded-xl hover:bg-bg-tertiary/30 transition-all duration-300 hover:shadow-sm border border-border/70"
              style={{
                animationDelay: `${index * 75}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-start gap-4">
                {/* Profile Picture */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0 ring-2 ring-bg-tertiary group-hover:ring-accent/50 transition-all duration-300">
                    {getValidProfilePictureUrl(user.profile_picture_url) ? (
                      <img
                        src={getValidProfilePictureUrl(user.profile_picture_url)}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm sm:text-base font-semibold">{getUserInitials(user)}</span>
                    )}
                  </div>
                </div>

                {/* User Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-text-primary font-semibold text-base sm:text-lg truncate group-hover:text-accent transition-colors duration-200">
                          {user.full_name || "Unknown User"}
                        </h3>
                        {user.is_private && (
                          <FiUserCheck className="w-4 h-4 text-accent shrink-0" title="Private account" />
                        )}
                      </div>
                      <p className="text-text-muted text-sm font-medium truncate">@{user.username || "unknown"}</p>
                    </div>

                    {/* Follow Button */}
                    <button
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (user.is_private) {
                          handleRequest(user.id);
                        } else {
                          handleFollow(user.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        user.is_private
                          ? requested.has(user.id)
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
                          : following.has(user.id)
                            ? "bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80"
                            : "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md"
                      }`}
                    >
                      {user.is_private ? (
                        requested.has(user.id) ? (
                          <span className="flex items-center gap-1.5">
                            <FiUserCheck className="w-4 h-4" />
                            {t("search.requested") || "Requested"}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <FiUserPlus className="w-4 h-4" />
                            {t("search.request") || "Request"}
                          </span>
                        )
                      ) : following.has(user.id) ? (
                        <span className="flex items-center gap-1.5">
                          <FiUserCheck className="w-4 h-4" />
                          {t("search.following_btn") || "Following"}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <FiUser className="w-4 h-4" />
                          {t("search.follow") || "Follow"}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <div className="mb-3">
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                        {user.bio}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary">{user.follower_count || 0}</span>
                      <span className="text-text-muted">{t("search.followers") || "followers"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary">{user.following_count || 0}</span>
                      <span className="text-text-muted">{t("search.following") || "following"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
