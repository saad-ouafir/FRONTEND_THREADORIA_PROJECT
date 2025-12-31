import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Sample data - in a real app, this would come from an API
const suggestedUsers = [
  {
    id: 1,
    name: "Hamid Skefkef",
    username: "@hamidSkefkef",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jhon Ait Doe",
    username: "@7imaroJo7a",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "7adda Rodriguez",
    username: "@7adda",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "henry sanchez",
    username: "@henrySanchez",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 5,
    name: "monica tesla",
    username: "@monicaTesla",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 6,
    name: "mark ",
    username: "@Markelo",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
];

const FollowSuggestions = () => {
  const { t } = useTranslation();
  const [followedUsers, setFollowedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const isFollowing = (userId) => followedUsers.includes(userId);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  return (
    <div className="bg-bg-secondary rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3">
        <h2 className="text-text-primary font-semibold text-base sm:text-lg text-center">
          {t("rightbar.who_to_follow")}
        </h2>
      </div>

      {/* User List - Scrollable */}
      <div className="max-h-96 overflow-y-auto">
        {suggestedUsers.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className={`px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-4 hover:bg-bg-tertiary/50 transition-colors duration-200 ${
              index !== 2 ? "" : ""
            }`}>
            {/* Avatar */}
            <div className="shrink-0 relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-full"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-semibold text-sm sm:text-base truncate leading-tight">
                {user.name}
              </p>
              <p className="text-text-muted text-xs sm:text-sm truncate mt-0.5">
                {user.username}
              </p>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => handleFollow(user.id)}
              className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                isFollowing(user.id)
                  ? "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80"
                  : "bg-accent text-white hover:bg-accent-hover active:scale-[0.97]"
              }`}>
              {isFollowing(user.id)
                ? t("rightbar.following")
                : t("rightbar.follow")}
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="px-4 sm:px-5 py-2.5">
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 text-accent hover:text-accent-hover text-sm font-medium transition-colors duration-200 hover:bg-accent/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50">
          {t("rightbar.see_more")}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-bg-secondary rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[85vh] flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
                {t("rightbar.who_to_follow")}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Close modal">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable List */}
            <div className="overflow-y-auto flex-1 min-h-0">
              {suggestedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`px-5 sm:px-6 py-4 sm:py-4.5 flex items-center gap-4 hover:bg-bg-tertiary/50 transition-colors duration-200 ${
                    index !== suggestedUsers.length - 1 ? "" : ""
                  }`}>
                  {/* Avatar */}
                  <div className="shrink-0 relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-semibold text-base truncate leading-tight">
                      {user.name}
                    </p>
                    <p className="text-text-muted text-sm truncate mt-0.5">
                      {user.username}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`shrink-0 px-4 sm:px-5 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                      isFollowing(user.id)
                        ? "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80"
                        : "bg-accent text-white hover:bg-accent-hover active:scale-[0.97]"
                    }`}>
                    {isFollowing(user.id)
                      ? t("rightbar.following")
                      : t("rightbar.follow")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default FollowSuggestions;
