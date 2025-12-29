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
];

const FollowSuggestions = () => {
  const { t } = useTranslation();
  const [followedUsers, setFollowedUsers] = useState([]);

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

      {/* User List */}
      <div className="">
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
        <button className="w-full py-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200 hover:bg-bg-tertiary/50 rounded-md">
          {t("rightbar.see_more")}
        </button>
      </div>
    </div>
  );
};

export default FollowSuggestions;
