import { FaHeart, FaComment, FaShare, FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import ImageGallery from "../UI/ImageGallery";
import useProfile from "../../hooks/states/useProfile";
import { deleteThread } from "../../api/thread.api";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";

export default function ThreadsCard({ threads = [], allowDelete = false, onDelete }) {
  const [alert, setAlert] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const currentUser = useProfile();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuId]);

  const handleDeleteThread = async threadId => {
    console.log("handleDeleteThread called with threadId:", threadId);
    if (!window.confirm("Are you sure you want to delete this thread?")) {
      console.log("User cancelled deletion");
      return;
    }

    console.log("User confirmed deletion, making API call...");
    try {
      setAlert(null);
      const response = await deleteThread(threadId);
      console.log("Delete API response:", response);
      setAlert({ message: response.message, statusCode: response.status });
      setOpenMenuId(null);

      // Call onDelete callback if provided to update parent component's state
      if (onDelete) {
        onDelete(threadId);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setAlert({ message: err.message || "Failed to delete thread", statusCode: err.status || 500 });
    }
  };
  return (
    <div className="divide-y">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      {threads && threads.length === 0 && (
        <div className="w-full h-40 flex items-center justify-center m-auto rounded-lg bg-bg-secondary p-4">
          <p className="text-3xl text-center font-semibold">No threads found !</p>
        </div>
      )}
      {threads &&
        threads.length > 0 &&
        threads.map(thread => (
          <div
            key={thread.id}
            className="p-4 transition-colors border-b border-border bg-bg-secondary hover:bg-bg-tertiary"
          >
            {/* Header: Avatar + User Info */}
            <div className="flex gap-3">
              {getValidProfilePictureUrl(thread.author.avatar_url) ? (
                <img
                  src={getValidProfilePictureUrl(thread.author.avatar_url)}
                  alt={thread.author.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-semibold">{getUserInitials(thread.author)}</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                {/* User info row */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{thread.author.name}</span>
                  <span className="text-xs text-text-secondary">@{thread.author.username}</span>
                  <span className="text-xs text-text-secondary">·</span>
                  <span className="text-xs text-text-secondary">
                    {new Date(thread.created_at).toLocaleDateString()}
                  </span>
                  {/* Three-dot menu - only show if allowDelete is true and user is thread author */}
                  {allowDelete &&
                    currentUser?.id &&
                    thread.author?.id &&
                    String(currentUser.id) === String(thread.author.id) && (
                      <div className="ml-auto relative" ref={menuRef}>
                        <button
                          onClick={() => {
                            console.log("Delete button clicked for thread:", thread.id);
                            console.log("Current user:", currentUser);
                            console.log("Thread author:", thread.author);
                            setOpenMenuId(openMenuId === thread.id ? null : thread.id);
                          }}
                          className="p-1.5 rounded-full hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors group"
                          title="Options"
                        >
                          <BsThreeDots className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === thread.id && (
                          <div className="absolute right-0 top-full mt-1 z-10 bg-bg-secondary border border-border rounded-lg shadow-lg min-w-40 overflow-hidden">
                            <button
                              onClick={() => handleDeleteThread(thread.id)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left"
                            >
                              <FaTrash className="w-3.5 h-3.5" />
                              <span>Delete Thread</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                </div>

                {/* Thread content */}
                <p className="mt-1 text-sm">{thread.content}</p>

                {/* Media Gallery */}
                {thread.media && thread.media.length > 0 && (
                  <div className="mt-3">
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

                {/* Thread actions */}
                <div className="flex items-center gap-6 mt-3 text-text-secondary">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
                    <FaHeart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">{thread.likes_count}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                    <FaComment className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">{thread.replies_count}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
                    <FaShare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">{thread.shares_count}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
