import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiCalendar, FiEdit2 } from "react-icons/fi";
import { formatNumber } from "../utils/numberUtils.js";
import { formatDate } from "../utils/dateUtils.js";
import { AuthContext } from "../context/AuthContext.js";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  // If no user is logged in, show a loading or login prompt
  if (!user) {
    return (
      <div className="h-full w-full bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted text-lg">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  
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
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt={user.full_name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-bg-secondary object-cover shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-bg-secondary bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    {user.full_name
                      ? user.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-secondary" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-2">
              <button className="p-2 rounded-full bg-bg-tertiary border border-border/70 text-text-secondary hover:bg-bg-tertiary/80 transition-colors duration-200">
                <FiEdit2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              {user.full_name || "Unknown User"}
            </h1>
            <p className="text-text-muted text-base">@{user.username || "user"}</p>
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
                {t("profile.joined")} {user.created_at ? formatDate(user.created_at) : "Recently"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pb-5 border-b border-border">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-text-primary">
                {formatNumber(user.posts_count || 0)}
              </span>
              <span className="text-text-muted">{t("profile.posts")}</span>
            </div>
            <button className="flex items-center gap-1.5 hover:underline">
              <span className="font-bold text-text-primary">
                {formatNumber(user.following_count || 0)}
              </span>
              <span className="text-text-muted">{t("profile.following")}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:underline">
              <span className="font-bold text-text-primary">
                {formatNumber(user.follower_count || 0)}
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
