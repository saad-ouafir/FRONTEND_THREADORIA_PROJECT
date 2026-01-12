import { useState, useRef } from "react";
import { FiImage, FiHash, FiX } from "react-icons/fi";

export default function ThreadForm() {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const tagInputRef = useRef(null);

  const handleSubmit = () => {
    if (!content.trim()) return;
    console.log("Thread content:", content);
    console.log("Files:", files);
    console.log("Tags:", tags);
    setContent("");
    setFiles([]);
    setTags([]);
  };

  const handleFileSelect = e => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = id => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleTagInputKeyDown = e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().replace(/^#/, "");
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = tagToRemove => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const charLimit = 500;
  const charCount = content.length;
  const isNearLimit = charCount > charLimit * 0.8;
  const isOverLimit = charCount > charLimit;

  return (
    <div className="border-b border-border">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <span className="font-bold text-lg">U</span>
            <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 transition-opacity"></div>
          </div>

          {/* Text Input Area */}
          <div className="flex-1 min-h-20">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={e => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
              }}
              placeholder="What's on your mind?"
              className="w-full resize-none bg-transparent text-text-primary text-base leading-relaxed transition-all focus:outline-none focus:border-none"
              rows={isFocused ? 4 : 3}
            />

            {/* File Previews */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {files.map(({ id, preview, file }) => (
                  <div key={id} className="relative group">
                    <img
                      src={preview}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(id)}
                      className="absolute -top-2 -right-2 w-6 h-6 text-red-500 hover:text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tags Display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-accent/10 text-accent"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="p-0.5 hover:text-accent-hover transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between mt-3 ml-15 transition-all duration-300">
          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="group p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
              title="Add images"
            >
              <FiImage className="w-5 h-5" />
            </label>

            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  setShowTagInput(!showTagInput);
                  setTimeout(() => tagInputRef.current?.focus(), 0);
                }}
                className="p-2 rounded-lg hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors duration-200"
                title="Add tags"
              >
                <FiHash className="w-5 h-5" />
              </button>
              {/* Tag Input Popover */}
              {showTagInput && (
                <div className="absolute left-0 top-full mt-2 z-10 bg-bg-secondary border border-border rounded-lg shadow-lg p-2">
                  <input
                    ref={tagInputRef}
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    onBlur={() => {
                      addTag();
                      setShowTagInput(false);
                    }}
                    placeholder="Add tag..."
                    className="w-48 px-3 py-2 border border-border rounded-lg text-sm bg-bg-tertiary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Character Counter */}
            {content.length > 0 && (
              <div
                className={`text-sm font-medium transition-colors ${
                  isOverLimit ? "text-red-500" : isNearLimit ? "text-orange-500" : "text-text-primary"
                }`}
              >
                <span className="tabular-nums">{charCount}</span>
                <span>/</span>
                <span>{charLimit}</span>
              </div>
            )}

            {/* Post Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className={`font-semibold px-6 py-2.5 rounded-full transition-all duration-200 ${
                content.trim() && !isOverLimit
                  ? "text-accent hover:text-accent-hover hover:bg-accent/10"
                  : "text-text-muted cursor-not-allowed"
              }`}
              disabled={!content.trim() || isOverLimit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
