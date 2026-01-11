import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProfileResultsCard({ fetchedUsers }) {
  const { t } = useTranslation();
  const [following, setFollowing] = useState(new Set());

  const handleFollow = userId => {
    setFollowing(prev => {
      const newFollowing = new Set(prev);
      if (newFollowing.has(userId)) {
        newFollowing.delete(userId);
      } else {
        newFollowing.add(userId);
      }
      return newFollowing;
    });
  };

  return (
    <div className="w-full p-6 font-sans">
      <h1 className="text-2xl border-b border-border mb-4">Profiles</h1>
      {!fetchedUsers || fetchedUsers.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-bg-tertiary rounded-full mb-4 border border-border">
            <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-text-muted font-medium">{t("search.no_users_found")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fetchedUsers.map((user, index) => (
            <div
              key={user.id}
              className="group bg-bg-secondary border border-border rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-accent/30 hover:bg-bg-tertiary/20"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Enhanced Profile Image */}
                <div className="relative">
                  {user.profile_picture_url ? (
                    <img
                      src={user.profile_picture_url}
                      alt={user.full_name || "User"}
                      className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full object-cover border-2 border-border group-hover:border-accent/50 transition-all duration-300 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full bg-gradient-to-br from-bg-tertiary to-bg-primary border-2 border-border group-hover:border-accent/50 transition-all duration-300 shadow-md flex items-center justify-center">
                      <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent">
                        {user.full_name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}

                  {/* Activity Indicator */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-bg-secondary rounded-full" />
                </div>

                {/* Enhanced User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0">
                        <h3 className="text-text-primary font-semibold text-base sm:text-lg truncate group-hover:text-accent transition-colors duration-200">
                          {user.full_name || "Unknown User"}
                        </h3>
                      </div>
                      <p className="text-text-muted text-sm font-medium truncate mb-3">@{user.username || "unknown"}</p>
                    </div>

                    {/* Enhanced Follow Button */}
                    <button
                      onClick={() => handleFollow(user.id)}
                      className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        following.has(user.id)
                          ? "bg-bg-tertiary text-text-primary border border-border hover:bg-bg-primary shadow-sm"
                          : "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg"
                      }`}
                    >
                      {following.has(user.id) ? t("search.following_btn") : t("search.follow")}
                    </button>
                  </div>

                  {/* Enhanced Bio */}
                  {user.bio && (
                    <div className="mb-2">
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                        {user.bio}
                      </p>
                    </div>
                  )}

                  {/* Stats - No Background */}
                  <div className="flex items-center text-sm gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary text-sm sm:text-base">
                        {user.follower_count || 0}
                      </span>
                      <span className="text-text-muted text-xs sm:text-sm font-medium">{t("search.followers")}</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary text-sm sm:text-base">
                        {user.following_count || 0}
                      </span>
                      <span className="text-text-muted text-xs sm:text-sm font-medium">{t("search.following")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
