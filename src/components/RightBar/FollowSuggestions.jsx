import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import { suggestProfiles } from "../../api/profile.api";
import { followUser, unfollowUser } from "../../api/follow.api";
import { Link } from "react-router-dom";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";

const FollowSuggestions = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await suggestProfiles(10, null, null);
        if (response?.users) {
          setSuggestedUsers(response.users);
        } else if (Array.isArray(response)) {
          setSuggestedUsers(response);
        } else {
          setSuggestedUsers([]);
        }
      } catch {
        setSuggestedUsers([]);
      }
    }
    fetchSuggestions();
  }, []);

  const handleFollow = async userId => {
    const user = suggestedUsers.find(u => u.id === userId);
    const currentStatus = user?.status;

    try {
      setAlert(null);

      // If already following (ACCEPTED), unfollow
      if (currentStatus === "ACCEPTED") {
        const response = await unfollowUser({ followingId: userId });
        setAlert({ message: response.message, statusCode: response.status });
        setSuggestedUsers(prev => prev.map(u => (u.id === userId ? { ...u, status: null } : u)));
      }
      // If pending, cancel request (unfollow)
      else if (currentStatus === "PENDING") {
        const response = await unfollowUser({ followingId: userId });
        setAlert({ message: response.message, statusCode: response.status });
        setSuggestedUsers(prev => prev.map(u => (u.id === userId ? { ...u, status: null } : u)));
      }
      // Otherwise, follow
      else {
        const response = await followUser({ followingId: userId });
        setAlert({ message: response.message, statusCode: response.status });
        setSuggestedUsers(prev => prev.map(u => (u.id === userId ? { ...u, status: response.followStatus } : u)));
      }
    } catch (err) {
      setAlert({ message: err.message || "Failed to update follow status", statusCode: err.status || 500 });
    }
  };

  return (
    <div className="bg-bg-secondary rounded-md overflow-hidden border border-border">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      {/* Header */}
      <div className="px-4 sm:px-5 py-3">
        <h2 className="text-text-primary font-semibold text-base sm:text-lg text-center">
          {t("rightbar.who_to_follow")}
        </h2>
      </div>

      {/* User List - Scrollable */}
      <div className="space-y-2 px-4 sm:px-5 py-2">
        {suggestedUsers.slice(0, 3).map(user => {
          const avatarSrc = user.profile_picture_url || null;
          const displayName = user.full_name || user.fullName || user.name || "Unknown";
          const uname = user.username || user.handle || "";
          return (
            <div key={user.id} className="flex items-center gap-3 px-2 py-2 rounded transition-colors duration-200">
              {/* Avatar */}
              <div className="shrink-0 relative">
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className="w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-full"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="text-text-primary font-semibold text-sm truncate leading-tight">
                  <Link
                    to={`/profile/${user.id}`}
                    className="hover:underline"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    {displayName}
                  </Link>
                </p>
                <p className="text-text-muted text-xs truncate mt-0.5">@{uname}</p>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => handleFollow(user.id)}
                className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg ${
                  user.status === "ACCEPTED"
                    ? "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80"
                    : user.status === "PENDING"
                    ? "bg-bg-tertiary text-text-secondary cursor-not-allowed"
                    : "bg-accent text-white hover:bg-accent-hover active:scale-[0.97]"
                }`}
                disabled={user.status === "PENDING"}
              >
                {user.status === "ACCEPTED"
                  ? t("rightbar.following")
                  : user.status === "PENDING"
                  ? t("rightbar.requested")
                  : t("rightbar.follow")}
              </button>
            </div>
          );
        })}
      </div>

      {/* See More Button */}
      <div className="px-4 sm:px-5 py-2.5">
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 text-accent hover:text-accent-hover text-sm font-medium transition-colors duration-200 hover:bg-accent/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {t("rightbar.see_more")}
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
        <div>
          {/* Header */}
          <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4">{t("rightbar.who_to_follow")}</h2>

          {/* Scrollable List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {suggestedUsers.map(user => (
              <div
                key={user.id}
                className="py-2.5 sm:py-3 flex items-center gap-3 hover:bg-bg-tertiary/30 px-2 rounded transition-colors duration-200"
              >
                {/* Avatar */}
                <div className="shrink-0 relative">
                  {getValidProfilePictureUrl(user.profile_picture_url || user.avatar_url) ? (
                    <img
                      src={getValidProfilePictureUrl(user.profile_picture_url || user.avatar_url)}
                      alt={user.full_name || user.fullName || user.name || "Unknown"}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center">
                      <span className="text-white text-sm sm:text-base font-semibold">{getUserInitials(user)}</span>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-semibold text-base truncate leading-tight">
                    <Link
                      to={`/profile/${user.id}`}
                      className="hover:underline"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      {user.full_name || user.fullName || user.name || "Unknown"}
                    </Link>
                  </p>
                  <p className="text-text-muted text-sm truncate mt-0.5">@{user.username || user.handle || ""}</p>
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(user.id)}
                  className={`shrink-0 px-4 py-2 sm:px-5 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                    user.status === "ACCEPTED"
                      ? "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80"
                      : user.status === "PENDING"
                      ? "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80"
                      : "bg-accent text-white hover:bg-accent-hover active:scale-[0.97]"
                  }`}
                >
                  {user.status === "ACCEPTED"
                    ? t("rightbar.following")
                    : user.status === "PENDING"
                    ? t("rightbar.requested")
                    : t("rightbar.follow")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FollowSuggestions;
