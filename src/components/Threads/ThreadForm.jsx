import { useState } from "react";
import { FiImage, FiLink, FiHash } from "react-icons/fi";

export default function ThreadForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle thread submission
    console.log("Thread content:", content);
    setContent("");
  };

  return (
    <div className="border-b border-border bg-bg-secondary p-4">
      <form onSubmit={handleSubmit}>
        {/* Input area with avatar */}
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-400 to-pink-400 flex items-center justify-center shrink-0">
            <span className="text-white font-semibold text-sm">U</span>
          </div>

          {/* Text input */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start a thread..."
              className="w-full resize-none border-none outline-none bg-transparent text-text-primary placeholder-text-muted text-base"
              rows={3}
            />
          </div>
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between mt-4 ml-13">
          {/* Icons */}
          <div className="flex items-center space-x-4 text-text-muted">
            <button
              type="button"
              className="hover:text-accent transition-colors"
              title="Add image">
              <FiImage className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="hover:text-accent transition-colors"
              title="Add link">
              <FiLink className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="hover:text-accent transition-colors"
              title="Add hashtag">
              <FiHash className="w-5 h-5" />
            </button>
          </div>

          {/* Post button */}
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-white font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
            disabled={!content.trim()}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
