import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Modal from "../../UI/Modal";
import { getValidProfilePictureUrl, getUserInitials } from "../../../utils/profile/profileUtils";

// Mock test data for public followers
const mockPublicFollows = [
  {
    id: 4,
    user: {
      id: 201,
      name: "Emma Davis",
      username: "emma_artist",
      profile_picture_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Digital artist and illustrator.",
      follower_count: 567,
      following_count: 123,
    },
    read: false,
    type: "follow",
  },
  {
    id: 5,
    user: {
      id: 202,
      name: "Frank Miller",
      username: "frank_coder",
      profile_picture_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "Software engineer at Google.",
      follower_count: 892,
      following_count: 456,
    },
    read: true,
    type: "follow",
  },
  {
    id: 6,
    user: {
      id: 203,
      name: "Grace Lee",
      username: "grace_startup",
      profile_picture_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      bio: "Entrepreneur and startup founder.",
      follower_count: 1234,
      following_count: 678,
    },
    read: false,
    type: "follow",
  },
  {
    id: 7,
    user: {
      id: 204,
      name: "Henry Wilson",
      username: "henry_traveler",
      profile_picture_url:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      bio: "Travel blogger and photographer.",
      follower_count: 445,
      following_count: 234,
    },
    read: true,
    type: "follow",
  },
  {
    id: 8,
    user: {
      id: 205,
      name: "Ivy Chen",
      username: "ivy_chef",
      profile_picture_url:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Professional chef and food blogger.",
      follower_count: 789,
      following_count: 345,
    },
    read: false,
    type: "follow",
  },
  {
    id: 9,
    user: {
      id: 206,
      name: "Jack Thompson",
      username: "jack_musician",
      profile_picture_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Jazz musician and composer.",
      follower_count: 654,
      following_count: 198,
    },
    read: true,
    type: "follow",
  },
  {
    id: 10,
    user: {
      id: 207,
      name: "Kate Johnson",
      username: "kate_teacher",
      profile_picture_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      bio: "High school teacher passionate about STEM education.",
      follower_count: 432,
      following_count: 267,
    },
    read: false,
    type: "follow",
  },
  {
    id: 11,
    user: {
      id: 208,
      name: "Liam Rodriguez",
      username: "liam_architect",
      profile_picture_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "Sustainable architecture and urban planning.",
      follower_count: 876,
      following_count: 321,
    },
    read: true,
    type: "follow",
  },
  {
    id: 12,
    user: {
      id: 209,
      name: "Maya Singh",
      username: "maya_artist",
      profile_picture_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Contemporary artist working with mixed media.",
      follower_count: 543,
      following_count: 189,
    },
    read: false,
    type: "follow",
  },
];

export default function PublicFollowers() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use mock data directly
  const publicFollows = mockPublicFollows;

  const computedValues = useMemo(() => {
    const displayedFollows = publicFollows.slice(0, 3);
    return {
      displayedFollows,
      hasContent: publicFollows.length > 0,
    };
  }, [publicFollows]);

  if (!computedValues.hasContent) return null;

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-text-primary">
              {t("notifications.new_followers", "New followers")}
            </h2>
            {publicFollows.filter(follow => !follow.read).length > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                {publicFollows.filter(follow => !follow.read).length}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {computedValues.displayedFollows.map(follow => (
            <FollowItem key={follow.id} user={follow.user} userID={follow.user.id} isRead={follow.read} />
          ))}
        </div>

        {publicFollows.length > 3 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 py-3 px-4 bg-bg-primary hover:bg-bg-tertiary border border-border hover:border-accent/30 text-accent hover:text-accent-hover text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow-md"
          >
            <FiChevronDown className="w-4 h-4" />
            <span>{t("rightbar.see_more", "See more")}</span>
            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">
              {publicFollows.length - 3}
            </span>
          </button>
        )}

        {/* Modal for showing all followers */}
        <AllFollowersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} followers={publicFollows} />
      </div>
    </div>
  );
}

// Follow Item Component
function FollowItem({ user, userID, isRead }) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-bg-primary hover:bg-bg-tertiary transition-colors rounded-lg relative ${
        !isRead ? "bg-accent/5" : ""
      }`}
    >
      {!isRead && <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></div>}
      <Link to={`/profile/${userID}`} className="shrink-0">
        {getValidProfilePictureUrl(user.profile_picture_url) ? (
          <img
            src={getValidProfilePictureUrl(user.profile_picture_url)}
            alt={user.name}
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">{getUserInitials(user)}</span>
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/profile/${userID}`}
            className="font-medium text-text-primary hover:text-accent transition-colors truncate"
          >
            {user.name}
          </Link>
          <span className="text-text-secondary text-sm">•</span>
          <span className="text-text-secondary text-sm truncate">
            {t("notifications.started_following", "started following you")}
          </span>
        </div>
      </div>

      <button className="shrink-0 px-4 py-2 text-sm font-medium text-accent hover:text-accent-hover hover:bg-accent/10 transition-colors border border-accent/30 rounded-lg">
        Follow
      </button>
    </div>
  );
}

// Modal Component for showing all followers
function AllFollowersModal({ isOpen, onClose, followers }) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          {t("notifications.all_followers", "All Followers")}
        </h2>

        <div className="space-y-3">
          {followers.map(follow => (
            <FollowItem key={follow.id} user={follow.user} userID={follow.user.id} isRead={follow.read} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
