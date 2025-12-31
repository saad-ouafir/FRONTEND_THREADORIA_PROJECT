import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCalendar, FiEdit2 } from "react-icons/fi";

// Sample user data - in a real app, this would come from an API
const sampleUser = {
  id: 1,
  name: "Sarah Chen",
  username: "@sarahchen",
  avatar: "https://i.pravatar.cc/300?img=1",
  bio: "Full-stack developer | Open source enthusiast | Coffee lover ☕ | Building cool things with React & Node.js",
  joinedDate: "2023-03-15",
  followers: 2847,
  following: 892,
  posts: 156,
};

export default function Profile() {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [user] = useState(sampleUser);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="h-full w-full bg-bg-primary">
      {/* Profile Card with External Border */}
      <div className="w-full bg-bg-secondary border border-border overflow-hidden">
        {/* Cover Banner */}
        <div className="relative h-32 md:h-44 bg-linear-to-r from-accent/40 via-accent/20 to-accent/40" />

        {/* Profile Content */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          {/* Avatar & Actions Row */}
          <div className="relative flex justify-between items-end -mt-16 md:-mt-20 mb-4">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-bg-secondary object-cover shadow-lg"
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-secondary" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-2">
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  isFollowing
                    ? "bg-bg-tertiary text-text-primary border border-border/70 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
                    : "bg-accent text-white hover:bg-accent/90 active:scale-95"
                }`}>
                {isFollowing ? t("profile.following") : t("profile.follow")}
              </button>
              <button className="p-2 rounded-full bg-bg-tertiary border border-border/70 text-text-secondary hover:bg-bg-tertiary/80 transition-colors duration-200">
                <FiEdit2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              {user.name}
            </h1>
            <p className="text-text-muted text-base">{user.username}</p>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              {user.bio}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-text-muted text-sm mb-5">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              <span>
                {t("profile.joined")} {formatDate(user.joinedDate)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pb-5 border-b border-border">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-text-primary">
                {formatNumber(user.posts)}
              </span>
              <span className="text-text-muted">{t("profile.posts")}</span>
            </div>
            <button className="flex items-center gap-1.5 hover:underline">
              <span className="font-bold text-text-primary">
                {formatNumber(user.following)}
              </span>
              <span className="text-text-muted">{t("profile.following")}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:underline">
              <span className="font-bold text-text-primary">
                {formatNumber(user.followers)}
              </span>
              <span className="text-text-muted">{t("profile.followers")}</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button className="flex-1 py-4 text-center font-semibold text-accent border-b-2 border-accent">
              {t("profile.threads")}
            </button>
            <button className="flex-1 py-4 text-center font-semibold text-text-muted hover:text-text-primary hover:bg-bg-tertiary/30 transition-colors rounded-t-lg">
              {t("profile.media")}
            </button>
            <button className="flex-1 py-4 text-center font-semibold text-text-muted hover:text-text-primary hover:bg-bg-tertiary/30 transition-colors rounded-t-lg">
              {t("profile.likes")}
            </button>
          </div>

          {/* Empty State for Threads */}
          <div className="py-16 text-center">
            <p className="text-text-muted text-lg">{t("profile.no_threads")}</p>
            <p className="text-text-muted/70 text-sm mt-2">
              {t("profile.no_threads_description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
