import { useState, useEffect } from "react";
import {
  FaHeart,
  FaComment,
  FaImage,
  FaVideo,
  FaDownload,
  FaExpand,
  FaShare,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

// Random test object for development/testing
const testThread = {
  id: 1,
  author_id: 123,
  content:
    "Just shipped a new feature! 🚀 Working on this project has been an incredible journey. The team's dedication and user feedback made all the difference. What's your favorite productivity hack?",
  likes_count: 342,
  replies_count: 28,
  shares_count: 15,
  created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  deleted_at: null,
  author: {
    id: 123,
    full_name: "Alex Chen",
    username: "alexchen",
    email: "alex@example.com",
    profile_picture_url: "https://picsum.photos/seed/user1/40/40.jpg",
    profile_metadata: null,
    bio: "Full-stack developer passionate about React and Node.js",
    follower_count: 1250,
    following_count: 342,
    is_private: false,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  media: [
    {
      id: 1,
      thread_id: 1,
      url: "https://picsum.photos/seed/thread1/600/400.jpg",
      media_type: "IMAGE",
      metadata: { width: 600, height: 400, provider: "picsum" },
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
  reactions: [],
  tags: [],
  replies: [],
  parent: null,
};

export default function ThreadsCard({ thread = testThread }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(thread.likes_count || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  const { t } = useTranslation();

  {
    !thread && (
      <div className="py-16 text-center">
        <p className="text-text-muted text-lg">{t("profile.no_threads")}</p>
        <p className="text-text-muted/70 text-sm mt-2">
          {t("profile.no_threads_description")}
        </p>
      </div>
    );
  }

  // Format timestamp for display
  const formatTimestamp = createdAt => {
    const now = new Date();
    const threadDate = new Date(createdAt);
    const diffMs = now - threadDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "just now";
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return threadDate.toLocaleDateString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = (mediaUrl, fileName) => {
    const link = document.createElement("a");
    link.href = mediaUrl;
    link.download = fileName || `media-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = media => {
    setFullscreenMedia(media);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenMedia(null);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Post by ${thread.author?.full_name || "Unknown User"}`,
      text: thread.content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.url}`);
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  // Handle body scroll lock when fullscreen changes
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const renderMedia = () => {
    if (!thread.media || thread.media.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        {thread.media.map((mediaItem, index) => (
          <div
            key={mediaItem.id || index}
            className="relative rounded-xl overflow-hidden"
          >
            {mediaItem.media_type === "IMAGE" && (
              <>
                <img
                  src={mediaItem.url}
                  alt="Thread media"
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleFullscreen(mediaItem)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="View fullscreen"
                  >
                    <FaExpand className="text-sm" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        mediaItem.url,
                        `image-${mediaItem.id || "thread"}.jpg`
                      )
                    }
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="Download image"
                  >
                    <FaDownload className="text-sm" />
                  </button>
                </div>
              </>
            )}
            {mediaItem.media_type === "VIDEO" && (
              <div className="relative">
                <video
                  src={mediaItem.url}
                  className="w-full h-auto max-h-96 object-cover"
                  controls
                />
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaVideo className="text-xs" />
                  Video
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleFullscreen(mediaItem)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="View fullscreen"
                  >
                    <FaExpand className="text-sm" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        mediaItem.url,
                        `video-${mediaItem.id || "thread"}.mp4`
                      )
                    }
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="Download video"
                  >
                    <FaDownload className="text-sm" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-b border-border bg-bg-secondary p-4 hover:bg-bg-tertiary/30 transition-colors">
      {/* Thread Header */}
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={thread.author?.profile_picture_url || "/default-avatar.png"}
            alt={thread.author?.full_name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-text-primary hover:underline cursor-pointer">
              {thread.author?.full_name || "Unknown User"}
            </span>
            <span className="text-text-muted text-sm">
              @{thread.author?.username || "unknown"}
            </span>
            <span className="text-text-muted text-sm">·</span>
            <span className="text-text-muted text-sm">
              {formatTimestamp(thread.created_at)}
            </span>
          </div>

          {/* Thread Content */}
          <div className="mt-1 text-text-primary whitespace-pre-wrap">
            {thread.content}
          </div>

          {/* Media */}
          {renderMedia()}

          {/* Action Buttons */}
          <div className="mt-3 flex items-center space-x-8">
            {/* Comment Button */}
            <button className="flex items-center space-x-2 text-text-muted hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                <FaComment className="text-lg" />
              </div>
              <span className="text-sm font-medium">
                {thread.replies_count || 0}
              </span>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked ? "text-red-500" : "text-text-muted hover:text-red-500"
              }`}
            >
              <div
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? "bg-red-500/10" : "group-hover:bg-red-500/10"
                }`}
              >
                <FaHeart
                  className={`text-lg ${isLiked ? "fill-current" : ""}`}
                />
              </div>
              <span className="text-sm font-medium">{likesCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-text-muted hover:text-green-500 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <FaShare className="text-lg" />
              </div>
              <span className="text-sm font-medium">
                {thread.shares_count || 0}
              </span>
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-3 text-xs text-text-muted">
            <span>{thread.likes_count || 0} likes</span>
            <span className="mx-1">·</span>
            <span>{thread.replies_count || 0} comments</span>
            <span className="mx-1">·</span>
            <span>{thread.shares_count || 0} shares</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && fullscreenMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            title="Close fullscreen"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {fullscreenMedia.media_type === "IMAGE" && (
            <img
              src={fullscreenMedia.url}
              alt="Fullscreen media"
              className="max-w-full max-h-full object-contain"
              onClick={e => e.stopPropagation()}
            />
          )}

          {fullscreenMedia.media_type === "VIDEO" && (
            <video
              src={fullscreenMedia.url}
              className="max-w-full max-h-full"
              controls
              autoPlay
              onClick={e => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
}
