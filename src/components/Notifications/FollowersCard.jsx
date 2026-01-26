import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiUser, FiChevronDown } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile";

export default function FollowersCard({ followers, displayLimit, onAccept, onReject, onFollow }) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const is_private = useProfile().is_private;

  if (!followers || followers.length === 0) return null;

  const displayedFollowers = displayLimit && !showAll ? followers.slice(0, displayLimit) : followers;
  const hasMore = displayLimit && followers.length > displayLimit && !showAll;

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-text-primary">
              {is_private === true ? t("notifications.follow_requests") : t("notifications.new_followers")}
            </h2>
          </div>
        </div>

        {followers.length === 0 ||
          (!followers && (
            <div className="bg-bg-primary ">
              <p>{t("notifications.no_other")}</p>
            </div>
          ))}
        <div className="space-y-2">
          {displayedFollowers.map(follower => (
            <div
              key={follower.id}
              className={`flex items-center gap-3 p-3 bg-bg-primary border border-border hover:border-accent/30 transition-colors rounded-lg relative cursor-pointer ${
                !follower.read ? "bg-accent/5 border-accent/20" : ""
              }`}
            >
              {!follower.read && <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></div>}

              <Link to={`/profile/${follower.follower.id}`} className="shrink-0">
                {follower.follower.profile_picture_url ? (
                  <img
                    src={follower.follower.profile_picture_url}
                    alt={follower.follower.full_name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-bg-tertiary rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-text-muted" />
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/profile/${follower.follower.id}`}
                    className="font-medium text-text-primary hover:text-accent transition-colors truncate"
                  >
                    {follower.follower.full_name}
                  </Link>
                  <span className="text-text-secondary text-sm">|</span>
                  <span className="text-text-secondary text-sm truncate">
                    {follower.status === "PENDING"
                      ? t("notifications.requested_follow", "requested to follow you")
                      : t("notifications.started_following", "started following you")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                {follower.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => onAccept(follower.follower_id)}
                      className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-white transition-colors rounded-lg shadow-sm"
                    >
                      {t("notifications.accept", "Accept")}
                    </button>
                    <button
                      onClick={() => onReject(follower.follower_id)}
                      className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-700 disabled:bg-red-500/50 text-white transition-colors rounded-lg shadow-sm"
                    >
                      {t("notifications.reject", "Reject")}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onFollow(follower.follower_id)}
                    className="px-4 py-2 text-sm font-medium text-accent hover:text-accent-hover hover:bg-accent/10 transition-colors border border-accent/30 rounded-lg"
                  >
                    {t("notifications.follow", "Follow")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-4 py-2 px-4 bg-bg-primary hover:bg-bg-tertiary border border-border hover:border-accent/30 text-accent hover:text-accent-hover text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-lg"
          >
            <FiChevronDown className="w-4 h-4" />
            <span>{t("rightbar.see_more", "See more")}</span>
            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">
              {followers.length - displayLimit}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
