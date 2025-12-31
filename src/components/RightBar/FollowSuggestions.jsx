import { useState } from "react";
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

  return (
    <div className="bg-bg-secondary rounded-md border border-border overflow-hidden py-4">
      {/* Header */}
      <div className="px-4 py-2">
        <h1 className="text-text-primary font-bold text-lg text-center">
          {t("rightbar.who_to_follow")}
        </h1>
      </div>

      {/* User List - Scrollable */}
      <div className="max-h-58 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="px-4 py-2 flex items-center gap-3 hover:bg-bg-tertiary/50 transition-colors duration-200">
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-medium text-sm truncate">
                {user.name}
              </p>
              <p className="text-text-muted text-xs truncate">
                {user.username}
              </p>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => handleFollow(user.id)}
              className={`shrink-0 px-4 py-1.5 full text-sm font-medium transition-all duration-200 rounded-md ${
                isFollowing(user.id)
                  ? "bg-bg-tertiary text-text-secondary hover:bg-gray-500/10 hover:text-gray-500 hover:border-gary-500/30"
                  : "bg-accent text-white hover:bg-accent/90 active:scale-95"
              }`}>
              {isFollowing(user.id)
                ? t("rightbar.following")
                : t("rightbar.follow")}
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="px-4 pt-3">
        <button 
          onClick={() => setShowModal(true)}
          className="w-full py-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200 hover:bg-bg-tertiary/50 rounded-md"
        >
          {t("rightbar.see_more")}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[40%] max-h-[80vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">
                {t("rightbar.who_to_follow")}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Scrollable List */}
            <div className="overflow-y-auto max-h-[60vh]">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="px-6 py-4 flex items-center gap-3 hover:bg-bg-tertiary/50 transition-colors duration-200 border-b border-border last:border-b-0"
                >
                  {/* Avatar */}
                  <div className="shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium truncate">
                      {user.name}
                    </p>
                    <p className="text-text-muted text-sm truncate">
                      {user.username}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      isFollowing(user.id)
                        ? "bg-bg-tertiary text-text-secondary hover:bg-gray-500/10 hover:text-gray-500 hover:border-gray-500/30"
                        : "bg-accent text-white hover:bg-accent/90 active:scale-95"
                    }`}
                  >
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
