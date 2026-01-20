import { FaHeart, FaComment, FaShare, FaTrash } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../UI/ImageGallery";
import useProfile from "../../hooks/states/useProfile";
import { deleteThread } from "../../api/thread.api";
import { likeThread, unlikeThread, checkUserLike, shareThread } from "../../api/reaction.api";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";
import ConfirmationBox from "../UI/ConfirmationBox";
import { Link } from "react-router-dom";

export default function ThreadsCard({ threads = [], allowDelete = false, onDelete, message }) {
  const [alert, setAlert] = useState(null);
  const [deletingThreadId, setDeletingThreadId] = useState(null);
  const [likedThreads, setLikedThreads] = useState(new Set());
  const [isLiking, setIsLiking] = useState({});
  const [isSharing, setIsSharing] = useState({});
  const [threadUpdates, setThreadUpdates] = useState({});
  const currentUser = useProfile();
  const navigate = useNavigate();

  // Initialize liked threads on component mount
  useEffect(() => {
    const initializeLikedThreads = async () => {
      if (!currentUser?.id || threads.length === 0) return;

      try {
        const likedSet = new Set();
        for (const thread of threads) {
          const response = await checkUserLike(thread.id);
          if (response.liked) {
            likedSet.add(thread.id);
          }
        }
        setLikedThreads(likedSet);
      } catch (err) {
        console.error("Error checking liked threads:", err);
      }
    };

    initializeLikedThreads();
  }, [threads, currentUser?.id]);

  // Memoize thread counts to ensure they update when threads change
  const getThreadCounts = useMemo(() => {
    return threadId => {
      const thread = threads.find(t => t.id === threadId);
      if (!thread) return { likes_count: 0, shares_count: 0, replies_count: 0 };

      // Apply any pending updates
      const updates = threadUpdates[threadId] || {};
      return {
        likes_count: Math.max(0, (thread.likes_count || 0) + (updates.likeDelta || 0)),
        shares_count: Math.max(0, (thread.shares_count || 0) + (updates.shareDelta || 0)),
        replies_count: Math.max(0, thread.replies_count || 0),
      };
    };
  }, [threads, threadUpdates]);

  const handleDeleteThread = async threadId => {
    try {
      setAlert(null);
      const response = await deleteThread(threadId);
      setAlert({ message: response.message, statusCode: response.status });
      setDeletingThreadId(null);

      if (onDelete) {
        onDelete(threadId);
      }
    } catch (err) {
      setDeletingThreadId(null);
      console.error("Delete error:", err);
      setAlert({ message: err.message || "Failed to delete thread", statusCode: err.status || 500 });
    }
  };

  const handleLikeThread = async (e, threadId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser?.id) {
      setAlert({ message: "Please log in to like threads", statusCode: 401 });
      return;
    }

    try {
      setIsLiking(prev => ({ ...prev, [threadId]: true }));

      if (likedThreads.has(threadId)) {
        await unlikeThread(threadId);
        setLikedThreads(prev => new Set([...prev].filter(id => id !== threadId)));
        // Update the like count
        setThreadUpdates(prev => ({
          ...prev,
          [threadId]: {
            ...prev[threadId],
            likeDelta: (prev[threadId]?.likeDelta || 0) - 1,
          },
        }));
      } else {
        await likeThread(threadId);
        setLikedThreads(prev => new Set([...prev, threadId]));
        // Update the like count
        setThreadUpdates(prev => ({
          ...prev,
          [threadId]: {
            ...prev[threadId],
            likeDelta: (prev[threadId]?.likeDelta || 0) + 1,
          },
        }));
      }
    } catch (err) {
      console.error("Like error:", err);
      setAlert({ message: err.message || "Failed to update like", statusCode: err.status || 500 });
    } finally {
      setIsLiking(prev => ({ ...prev, [threadId]: false }));
    }
  };

  const handleCommentClick = (e, threadId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/thread/${threadId}`);
  };

  const handleShareClick = (e, threadId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser?.id) {
      setAlert({ message: "Please log in to share threads", statusCode: 401 });
      return;
    }

    setIsSharing(prev => ({ ...prev, [threadId]: true }));

    const threadUrl = `${window.location.origin}/thread/${threadId}`;

    // Try using native share API first
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this thread",
          url: threadUrl,
        })
        .then(async () => {
          try {
            // Call backend to record the share
            await shareThread(threadId);
            // Update the share count
            setThreadUpdates(prev => ({
              ...prev,
              [threadId]: {
                ...prev[threadId],
                shareDelta: (prev[threadId]?.shareDelta || 0) + 1,
              },
            }));
            setAlert({ message: "Thread shared successfully!", statusCode: 200 });
          } catch (err) {
            console.error("Share error:", err);
            setAlert({ message: err.message || "Failed to record share", statusCode: err.status || 500 });
          }
        })
        .catch(err => console.log("Share cancelled:", err))
        .finally(() => {
          setIsSharing(prev => ({ ...prev, [threadId]: false }));
        });
    } else {
      // Fallback: Copy to clipboard and record share
      navigator.clipboard.writeText(threadUrl);
      shareThread(threadId)
        .then(() => {
          // Update the share count for clipboard copy too
          setThreadUpdates(prev => ({
            ...prev,
            [threadId]: {
              ...prev[threadId],
              shareDelta: (prev[threadId]?.shareDelta || 0) + 1,
            },
          }));
          setAlert({ message: "Thread link copied to clipboard!", statusCode: 200 });
        })
        .catch(err => {
          console.error("Share error:", err);
          setAlert({ message: err.message || "Failed to record share", statusCode: err.status || 500 });
        })
        .finally(() => {
          setIsSharing(prev => ({ ...prev, [threadId]: false }));
        });
    }
  };

  return (
    <>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <div className="divide-y divide-border">
        {threads && threads.length === 0 && (
          <div className="w-full min-h-48 flex items-center justify-center rounded-lg p-4 sm:p-6">
            <p className="text-lg sm:text-2xl text-center font-semibold text-text-secondary">
              {message || "No threads found"}
            </p>
          </div>
        )}
        {threads &&
          threads.length > 0 &&
          threads.map(thread => (
            <div
              key={thread.id}
              className="group relative p-4 sm:p-6 transition-colors border-b border-border bg-bg-secondary hover:bg-bg-tertiary"
            >
              {/* Parent thread link - improved styling */}
              {thread.parent_id && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
                  <p className="text-xs sm:text-sm text-text-muted font-medium">Replied to</p>
                  <Link
                    to={`/thread/${thread.parent_id}`}
                    className="text-xs sm:text-sm text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Thread #{thread.parent_id}
                  </Link>
                </div>
              )}

              {/* Delete button - positioned better */}
              {allowDelete &&
                currentUser?.id &&
                thread.author?.id &&
                String(currentUser.id) === String(thread.author.id) && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setDeletingThreadId(thread.id)}
                      className="p-2 rounded-full hover:bg-red-500/10 text-text-secondary hover:text-red-500 transition-all duration-200 transform hover:scale-110"
                      title="Delete thread"
                      aria-label="Delete thread"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}

              {/* Confirmation modal */}
              {deletingThreadId === thread.id && (
                <ConfirmationBox
                  onConfirm={() => handleDeleteThread(deletingThreadId)}
                  onClose={() => setDeletingThreadId(null)}
                  message="Are you sure you want to delete this thread? This action cannot be undone."
                />
              )}

              {/* Main thread content - wrapped in Link */}
              <Link to={`/thread/${thread.id}`} className="block hover:no-underline">
                <div className="flex gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {getValidProfilePictureUrl(thread.author.profile_picture_url) ? (
                      <img
                        src={getValidProfilePictureUrl(thread.author.profile_picture_url)}
                        alt={thread.author.full_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm hover:shadow-md transition-shadow"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs sm:text-sm font-bold">
                          {getUserInitials(thread.author)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header: User info */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="font-semibold text-sm sm:text-base text-text-primary truncate hover:text-accent transition-colors">
                        {thread.author.full_name}
                      </span>
                      <span className="text-xs sm:text-sm text-text-muted shrink-0">@{thread.author.username}</span>
                      <span className="text-text-muted text-xs">·</span>
                      <span className="text-xs sm:text-sm text-text-muted shrink-0">
                        {new Date(thread.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Thread content - improved readability */}
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-text-primary line-clamp-6 whitespace-pre-wrap">
                      {thread.content}
                    </p>

                    {/* Media Gallery - responsive */}
                    {thread.media && thread.media.length > 0 && (
                      <div className="mt-3 sm:mt-4 rounded-lg overflow-hidden">
                        <ImageGallery
                          media={thread.media.map(item => ({
                            url: item.url,
                            type: item.media_type === "VIDEO" ? "video" : "image",
                            alt: `Media ${item.id}`,
                            fileName: `media-${item.id}.${item.media_type === "VIDEO" ? "mp4" : "jpg"}`,
                          }))}
                        />
                      </div>
                    )}

                    {/* Actions - improved styling and spacing */}
                    <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-border/30">
                      <button
                        onClick={e => handleLikeThread(e, thread.id)}
                        disabled={isLiking[thread.id]}
                        className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors group ${
                          likedThreads.has(thread.id) ? "text-red-500" : "text-text-secondary hover:text-red-500"
                        }`}
                        title="Like thread"
                        aria-label="Like thread"
                      >
                        <FaHeart
                          className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                            likedThreads.has(thread.id) ? "fill-current" : ""
                          }`}
                        />
                        <span className="font-medium">{getThreadCounts(thread.id).likes_count}</span>
                      </button>

                      <button
                        onClick={e => handleCommentClick(e, thread.id)}
                        className="flex items-center gap-1 sm:gap-2 text-text-secondary text-xs sm:text-sm hover:text-blue-500 transition-colors group"
                        title="Reply to thread"
                        aria-label="Reply to thread"
                      >
                        <FaComment className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{getThreadCounts(thread.id).replies_count}</span>
                      </button>

                      <button
                        onClick={e => handleShareClick(e, thread.id)}
                        disabled={isSharing[thread.id]}
                        className="flex items-center gap-1 sm:gap-2 text-text-secondary text-xs sm:text-sm hover:text-green-500 transition-colors group disabled:opacity-50"
                        title="Share thread"
                        aria-label="Share thread"
                      >
                        <FaShare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{getThreadCounts(thread.id).shares_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
