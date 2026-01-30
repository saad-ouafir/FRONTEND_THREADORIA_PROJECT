import { Link } from "react-router-dom";
import { getProfilePictureUrl, getUserInitials, getDisplayName, getUsername } from "../../utils/profile/profileUtils";

/**
 * Reusable User Avatar component
 */
export function UserAvatar({ user, size = "md", className = "" }) {
  const avatarUrl = getProfilePictureUrl(user);
  const displayName = getDisplayName(user);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const avatarSize = sizeClasses[size] || sizeClasses.md;

  if (avatarUrl) {
    return <img src={avatarUrl} alt={displayName} className={`${avatarSize} object-cover rounded-full ${className}`} />;
  }

  return (
    <div
      className={`${avatarSize} rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center ${className}`}
    >
      <span className="text-white text-sm font-semibold">{getUserInitials(user)}</span>
    </div>
  );
}

/**
 * Reusable User Card component for displaying user info with optional action button
 */
export default function UserCard({
  user,
  onAction,
  onLinkClick,
  size = "sm",
  actionButton = null,
  showStats = false,
  t,
}) {
  const displayName = getDisplayName(user);
  const username = getUsername(user);

  const sizeConfig = {
    sm: {
      avatar: "sm",
      text: "text-sm",
      subtext: "text-xs",
      btn: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm",
      container: "px-2 py-2",
    },
    lg: {
      avatar: "lg",
      text: "text-base",
      subtext: "text-sm",
      btn: "px-4 py-2 sm:px-5 text-sm",
      container: "px-2 py-3",
    },
  };

  const styles = sizeConfig[size] || sizeConfig.sm;

  return (
    <div
      className={`flex items-center gap-3 ${styles.container} rounded hover:bg-bg-tertiary/30 transition-colors duration-200`}
    >
      {/* Avatar */}
      <div className="shrink-0">
        <UserAvatar user={user} size={styles.avatar} />
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-text-primary font-semibold ${styles.text} truncate leading-tight`}>
          <Link to={`/profile/${user.id}`} className="hover:underline" onClick={onLinkClick}>
            {displayName}
          </Link>
        </p>
        <p className={`text-text-muted ${styles.subtext} truncate mt-0.5`}>@{username}</p>

        {/* Optional Stats */}
        {showStats && (
          <div className="flex items-center gap-4 mt-1 text-xs">
            <span className="text-text-muted">
              <span className="font-semibold text-text-primary">{user.follower_count || 0}</span>{" "}
              {t?.("search.followers") || "followers"}
            </span>
            <span className="text-text-muted">
              <span className="font-semibold text-text-primary">{user.following_count || 0}</span>{" "}
              {t?.("search.following") || "following"}
            </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      {actionButton && (
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onAction?.(user.id);
          }}
          className={`shrink-0 ${styles.btn} font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${actionButton.className}`}
        >
          {actionButton.icon && <actionButton.icon className="w-4 h-4 inline mr-1.5" />}
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
