import { FaHeart, FaComment, FaShare, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// UI components
import ImageGallery from "../UI/ImageGallery";
import AlertMessage from "../UI/AlertMessage";
import useProfile from "../../hooks/states/useProfile";

// Api methods
import { deleteThread } from "../../api/thread.api";
import { likeOrUnlikeThread, shareThread } from "../../api/reaction.api";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";
import ConfirmationBox from "../UI/ConfirmationBox";
import submitHandler from "../../handlers/submitHandler";
import { FiLock } from "react-icons/fi";

export default function ThreadsCard({ threads = [], allowDelete = false, message, forbidden }) {
  const [alert, setAlert] = useState(null);
  const [deletingThreadId, setDeletingThreadId] = useState(null);

  console.log(threads);
  const filtredLikedThreads = new Array(...threads.filter(thread => thread.isLiked).map(thread => thread.id));

  const currentUser = useProfile();
  const navigate = useNavigate();

  const handleDeleteThread = async thread => {
    setDeletingThreadId(thread.id);
    await submitHandler(setAlert, deleteThread, thread.id);
    const idx = threads.indexOf(thread);
    if (idx > -1) {
      threads.splice(idx, 1);
    }
  };

  const handleLikeThread = async (e, thread) => {
    e.preventDefault();
    e.stopPropagation();
    await submitHandler(setAlert, likeOrUnlikeThread, thread.id);
    if (!filtredLikedThreads.includes(thread.id) && !thread.isLiked) {
      thread.isLiked = true;
      thread.likes_count++;
    } else {
      thread.isLiked = false;
      thread.likes_count--;
    }
  };

  const handleShareClick = async (e, threadId) => {
    e.preventDefault();
    e.stopPropagation();
    await submitHandler(setAlert, shareThread, threadId);
    threads.find(thread => thread.id === threadId).shares_count++;
  };

  return (
    <>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <div className="divide-y divide-border">
        {forbidden && (
          <div className="w-full min-h-48 flex items-center justify-center rounded-lg p-4 sm:p-6">
            <p className="text-lg sm:text-2xl text-center font-semibold text-text-secondary">
              <span>
                <FiLock className="inline-block mr-2" />
              </span>
              This is A private Account
            </p>
          </div>
        )}

        {!forbidden && threads && threads.length === 0 && (
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
                  onConfirm={() => handleDeleteThread(thread)}
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
                        onClick={e => handleLikeThread(e, thread)}
                        className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors group ${
                          thread.isLiked ? "text-red-500" : "text-text-secondary hover:text-red-500"
                        }`}
                        title="Like thread"
                        aria-label="Like thread"
                      >
                        <FaHeart className={`w-4 h-4 group-hover:scale-110 transition-transform`} />
                        <span className="font-medium">{thread.likes_count}</span>
                      </button>

                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/thread/${thread.id}`);
                        }}
                        className="flex items-center gap-1 sm:gap-2 text-text-secondary text-xs sm:text-sm hover:text-blue-500 transition-colors group"
                        title="Reply to thread"
                        aria-label="Reply to thread"
                      >
                        <FaComment className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{thread.replies_count}</span>
                      </button>

                      <button
                        onClick={e => handleShareClick(e, thread.id)}
                        className="flex items-center gap-1 sm:gap-2 text-text-secondary text-xs sm:text-sm hover:text-green-500 transition-colors group"
                        title="Share thread"
                        aria-label="Share thread"
                      >
                        <FaShare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{thread.shares_count}</span>
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
