import { useEffect, useState, useCallback, useId } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import AlertMessage from "../UI/AlertMessage";
import UserCard from "../UI/UserCard";
import { suggestProfiles } from "../../api/profile.api";
import { getFollowButtonConfig } from "../../utils/profile/profileUtils";
import { useFollow } from "../../hooks/api/useFollow";
import { useFollowSync } from "../../hooks/api/useFollowSyncHook.js";
import { useAlert } from "../../hooks/states/useAlert";
import useProfile from "../../hooks/states/useProfile";

const FollowSuggestions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useProfile();
  const isAuthenticated = !!currentUser?.id;
  const { alert, setAlert, clearAlert } = useAlert();
  const { toggleFollow } = useFollow(setAlert);
  const { subscribe } = useFollowSync();
  const componentId = useId();

  const [showModal, setShowModal] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await suggestProfiles();
        const users = response?.users || (Array.isArray(response) ? response : []);
        // Filter out users who are already followed (ACCEPTED only)
        const unfollowedUsers = users.filter(user => user.followStatus !== "ACCEPTED");
        setSuggestedUsers(unfollowedUsers);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestedUsers([]);
      }
    };
    fetchSuggestions();
  }, []);

  // Subscribe to follow status changes from other components (e.g., ProfileInfo)
  useEffect(() => {
    const unsubscribe = subscribe(componentId, (userId, newFollowStatus) => {
      setSuggestedUsers(prev => {
        if (newFollowStatus === "ACCEPTED") {
          // Remove user from suggestions when fully followed
          return prev.filter(u => u.id !== userId);
        } else {
          // Update user's follow status (for PENDING or null)
          return prev.map(u => (u.id === userId ? { ...u, followStatus: newFollowStatus } : u));
        }
      });
    });
    return unsubscribe;
  }, [subscribe, componentId]);

  const handleFollow = useCallback(
    async userId => {
      if (!isAuthenticated) {
        // Redirect non-authenticated users to login
        navigate("/auth/login");
        return;
      }
      await toggleFollow(userId, response => {
        if (response.followStatus === "ACCEPTED") {
          // Remove user from suggestions when fully followed
          setSuggestedUsers(prev => prev.filter(u => u.id !== userId));
        } else {
          // Update user's follow status (for PENDING or null)
          setSuggestedUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, followStatus: response.followStatus } : u)),
          );
        }
      });
    },
    [isAuthenticated, toggleFollow, navigate],
  );

  const closeModal = useCallback(() => setShowModal(false), []);

  const getButtonConfig = user => {
    // Show follow button for all users (authenticated or not)
    // For authenticated users, show their follow status (Follow/Requested/Following)
    // For non-authenticated users, just show "Follow" button
    return getFollowButtonConfig(isAuthenticated ? user.followStatus : null, t);
  };

  const renderUserCard = (user, size) => (
    <UserCard
      key={user.id}
      user={user}
      onAction={handleFollow}
      onLinkClick={closeModal}
      size={size}
      actionButton={getButtonConfig(user)}
      t={t}
    />
  );

  return (
    <div className="bg-bg-secondary rounded-md overflow-hidden border border-border">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}

      {/* Header */}
      <div className="px-4 sm:px-5 py-3">
        <h2 className="text-text-primary font-semibold text-base sm:text-lg text-center">
          {t("rightbar.who_to_follow")}
        </h2>
      </div>

      {/* User List Preview */}
      <div className="space-y-2 px-4 sm:px-5 py-2">
        {suggestedUsers.slice(0, 3).map(user => renderUserCard(user, "sm"))}
      </div>

      {/* See More Button */}
      {suggestedUsers.length > 3 && (
        <div className="px-4 sm:px-5 py-2.5">
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setShowModal(true);
            }}
            className="w-full py-2 text-accent hover:text-accent-hover text-sm font-medium transition-colors duration-200 hover:bg-accent/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {t("rightbar.see_more")}
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={showModal} onClose={closeModal}>
        {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4">{t("rightbar.who_to_follow")}</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {suggestedUsers.map(user => renderUserCard(user, "lg"))}
        </div>
      </Modal>
    </div>
  );
};

export default FollowSuggestions;
