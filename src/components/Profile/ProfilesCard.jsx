import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiUser, FiUsers, FiUserCheck, FiUserPlus, FiUserX, FiUserMinus } from "react-icons/fi";
import AlertMessage from "../UI/AlertMessage";
import { UserAvatar } from "../UI/UserCard";
import { getDisplayName, getUsername } from "../../utils/profile/profileUtils";
import { useFollow } from "../../hooks/api/useFollow";
import { useAlert } from "../../hooks/states/useAlert";

// Button configuration helper
const getButtonConfig = (user, isOwnProfile, listType, t, handlers) => {
  const { onRemoveFollower, onUnfollow, onToggleFollow } = handlers;

  // Own profile viewing followers list - show "Remove" button
  if (isOwnProfile && listType === "followers") {
    return {
      label: t("profile.remove") || "Remove",
      icon: FiUserX,
      className: "bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/30",
      action: () => onRemoveFollower(user.id),
    };
  }

  // Own profile viewing following list - show "Unfollow" button
  if (isOwnProfile && listType === "following") {
    return {
      label: t("profile.unfollow") || "Unfollow",
      icon: FiUserMinus,
      className: "bg-bg-tertiary text-text-primary hover:bg-red-500/10 hover:text-red-600 border border-border",
      action: () => onUnfollow(user.id),
    };
  }

  // Other cases - show follow/following/requested button
  if (user.followStatus === "ACCEPTED" || user.isFollowing) {
    return {
      label: t("search.following_btn") || "Following",
      icon: FiUserCheck,
      className: "bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80",
      action: () => onToggleFollow(user),
    };
  }

  if (user.followStatus === "PENDING") {
    return {
      label: t("search.requested") || "Requested",
      icon: FiUserCheck,
      className: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
      action: () => onToggleFollow(user),
    };
  }

  return {
    label: t("search.follow") || "Follow",
    icon: user.is_private ? FiUserPlus : FiUser,
    className: "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
    action: () => onToggleFollow(user),
  };
};

export default function ProfilesCard({
  fetchedUsers,
  title = "Profiles",
  isOwnProfile = false,
  listType = null,
  onCountChange,
}) {
  const { t } = useTranslation();
  const [users, setUsers] = useState(fetchedUsers || []);
  const { alert, setAlert, clearAlert } = useAlert();
  const { toggleFollow, removeFollower } = useFollow(setAlert);

  const handleUnfollow = useCallback(
    async userId => {
      await toggleFollow(userId, response => {
        if (!response.followStatus) {
          setUsers(prev => prev.filter(u => u.id !== userId));
          onCountChange?.(-1);
        }
      });
    },
    [toggleFollow, onCountChange],
  );

  const handleRemoveFollower = useCallback(
    async userId => {
      await removeFollower(userId, () => {
        setUsers(prev => prev.filter(u => u.id !== userId));
        onCountChange?.(-1);
      });
    },
    [removeFollower, onCountChange],
  );

  const handleToggleFollow = useCallback(
    async user => {
      await toggleFollow(user.id, response => {
        setUsers(prev =>
          prev.map(u =>
            u.id === user.id
              ? { ...u, followStatus: response.followStatus, isFollowing: response.followStatus === "ACCEPTED" }
              : u,
          ),
        );
      });
    },
    [toggleFollow],
  );

  const handlers = {
    onRemoveFollower: handleRemoveFollower,
    onUnfollow: handleUnfollow,
    onToggleFollow: handleToggleFollow,
  };

  return (
    <div className="w-full p-4 sm:p-6">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{title}</h1>
        <div className="w-12 h-0.5 bg-accent rounded-full"></div>
      </div>

      {!users || users.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
            <FiUsers className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t("search.no_users_found")}</h3>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {users.map((user, index) => {
            const buttonConfig = getButtonConfig(user, isOwnProfile, listType, t, handlers);
            const ButtonIcon = buttonConfig.icon;

            return (
              <Link
                key={user.id || index}
                to={`/profile/${user.id}`}
                className="block group p-4 sm:p-5 rounded-xl hover:bg-bg-tertiary/30 transition-all duration-300 hover:shadow-sm border border-border/70"
                style={{ animationDelay: `${index * 75}ms`, animation: "fadeInUp 0.6s ease-out forwards" }}
              >
                <div className="flex items-start gap-4">
                  {/* Profile Picture */}
                  <div className="relative shrink-0">
                    <div className="ring-2 ring-bg-tertiary group-hover:ring-accent/50 transition-all duration-300 rounded-full">
                      <UserAvatar user={user} size="lg" />
                    </div>
                  </div>

                  {/* User Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-text-primary font-semibold text-base sm:text-lg truncate group-hover:text-accent transition-colors duration-200">
                            {getDisplayName(user)}
                          </h3>
                          {user.is_private && (
                            <FiUserCheck className="w-4 h-4 text-accent shrink-0" title="Private account" />
                          )}
                        </div>
                        <p className="text-text-muted text-sm font-medium truncate">@{getUsername(user)}</p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          buttonConfig.action();
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${buttonConfig.className}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <ButtonIcon className="w-4 h-4" />
                          {buttonConfig.label}
                        </span>
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
                        <span className="text-text-muted">{t("search.followers")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary">{user.following_count || 0}</span>
                        <span className="text-text-muted">{t("search.following")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
