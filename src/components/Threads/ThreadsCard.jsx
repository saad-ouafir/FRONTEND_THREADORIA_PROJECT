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

export default function ThreadsCard() {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(6);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  // Generic thread data
  const thread = {
    id: 1,
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://picsum.photos/seed/user1/40/40.jpg",
      isVerified: true,
    },
    timestamp: "2h",
    content:
      "Just shipped a new feature! 🚀 Working on this project has been an incredible journey. The team's dedication and user feedback made all the difference. What's your favorite productivity hack?",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/thread1/600/400.jpg",
        alt: "Project screenshot",
      },
    ],
    stats: {
      likes: 342,
      comments: 28,
      shares: 15,
    },
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDownload = (mediaUrl, fileName) => {
    const link = document.createElement("a");
    link.href = mediaUrl;
    link.download = fileName || `media-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = (media) => {
    setFullscreenMedia(media);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenMedia(null);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Post by ${thread.author.name}`,
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
        {thread.media.map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            {item.type === "image" && (
              <>
                <img
                  src={item.url}
                  alt={item.alt || "Thread media"}
                  className="w-full h-auto max-h-96 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleFullscreen(item)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="View fullscreen">
                    <FaExpand className="text-sm" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        item.url,
                        `image-${item.alt || "thread"}.jpg`
                      )
                    }
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="Download image">
                    <FaDownload className="text-sm" />
                  </button>
                </div>
              </>
            )}
            {item.type === "video" && (
              <div className="relative">
                <video
                  src={item.url}
                  className="w-full h-auto max-h-96 object-cover"
                  controls
                />
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaVideo className="text-xs" />
                  Video
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleFullscreen(item)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="View fullscreen">
                    <FaExpand className="text-sm" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        item.url,
                        `video-${item.alt || "thread"}.mp4`
                      )
                    }
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    title="Download video">
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
            src={thread.author.avatar}
            alt={thread.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-text-primary hover:underline cursor-pointer">
              {thread.author.name}
            </span>
            {thread.author.isVerified && (
              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-text-muted text-sm">
              @{thread.author.username}
            </span>
            <span className="text-text-muted text-sm">·</span>
            <span className="text-text-muted text-sm">{thread.timestamp}</span>
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
                {thread.stats.comments}
              </span>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked ? "text-red-500" : "text-text-muted hover:text-red-500"
              }`}>
              <div
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? "bg-red-500/10" : "group-hover:bg-red-500/10"
                }`}>
                <FaHeart
                  className={`text-lg ${isLiked ? "fill-current" : ""}`}
                />
              </div>
              <span className="text-sm font-medium">{likesCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-text-muted hover:text-green-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                <FaShare className="text-lg" />
              </div>
              <span className="text-sm font-medium">{thread.stats.shares}</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="mt-3 text-xs text-text-muted">
            <span>{thread.stats.likes} likes</span>
            <span className="mx-1">·</span>
            <span>{thread.stats.comments} comments</span>
            <span className="mx-1">·</span>
            <span>{thread.stats.shares} shares</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && fullscreenMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}>
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            title="Close fullscreen">
            <svg
              className="w-8 h-8"
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

          {fullscreenMedia.type === "image" && (
            <img
              src={fullscreenMedia.url}
              alt={fullscreenMedia.alt || "Fullscreen media"}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {fullscreenMedia.type === "video" && (
            <video
              src={fullscreenMedia.url}
              className="max-w-full max-h-full"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
}
