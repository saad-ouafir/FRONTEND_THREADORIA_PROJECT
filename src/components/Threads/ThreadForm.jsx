import { useState, useRef } from "react";
import { FiImage, FiHash, FiX } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile";
import { createTread } from "../../api/thread.api";
import { uploadThreadMedia } from "../../api/media.api";
import { useValidateThreadForm } from "../../hooks/forms/useFormValidator";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";

export default function ThreadForm({ parentID = null, onThreadCreated }) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [alert, setAlert] = useState(null);
  const tagInputRef = useRef(null);
  useValidateThreadForm();

  const handleSubmit = async () => {
    if (!content.trim()) {
      setAlert({ message: "Thread content is required", statusCode: 400 });
      return;
    }

    const charLimit = 500;
    if (content.length > charLimit) {
      setAlert({ message: `Content must not exceed ${charLimit} characters`, statusCode: 400 });
      return;
    }

    try {
      // First create the thread
      const threadContent = content;
      const threadData = {
        content: threadContent,
        parent_id: parentID || null,
      };

      const threadResponse = await createTread(threadData);
      const threadId = threadResponse.thread.id;
      if (files.length > 0) {
        const mediaFormData = new FormData();
        files.forEach(f => mediaFormData.append("media", f.file));

        await uploadThreadMedia(threadId, mediaFormData);
      }

      // Reset form on success
      setContent("");
      setFiles([]);
      setTags([]);
      setAlert(null);
      setAlert({ message: "Thread created successfully!", statusCode: 200 });

      // Trigger refetch of threads
      if (onThreadCreated) {
        onThreadCreated();
      }
    } catch (error) {
      setAlert(null);
      console.error("Error creating thread:", error);
      setAlert({
        message: error.message || "Failed to create thread",
        statusCode: error.status || 500,
      });
      this.setState({ loading: false });
    }
  };

  const handleFileSelect = e => {
    const selectedFiles = Array.from(e.target.files);
    const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

    const validFiles = [];
    const invalidFiles = [];

    selectedFiles.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          preview: URL.createObjectURL(file),
        });
      }
    });

    if (invalidFiles.length > 0) {
      setAlert({
        message: `File(s) "${invalidFiles.join(", ")}" exceed 15MB limit`,
        statusCode: 400,
      });
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
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

  const user = useProfile();
  return (
    <div className="border-b border-border bg-bg-secondary">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white w-full h-full font-bold text-lg rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0">
              {getValidProfilePictureUrl(user.profile_picture_url) ? (
                <img
                  src={getValidProfilePictureUrl(user.profile_picture_url)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold ">{getUserInitials(user)}</span>
              )}
            </span>
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
              className="w-full resize-none bg-transparent text-text-primary text-base focus:outline-transparent focus:border-transparent"
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
                      className="bg-red-500 absolute -top-2 -right-2 w-6 h-6 text-white hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                      className="p-0.5 aspect-square transition-colors hover:bg-red-500 rounded-full hover:text-white"
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
                  content.length > 500 ? "text-red-500" : content.length > 400 ? "text-orange-500" : "text-text-primary"
                }`}
              >
                <span className="tabular-nums">{content.length}</span>
                <span>/</span>
                <span>500</span>
              </div>
            )}

            {/* Post Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className={`text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-200 bg-blue-500 ${
                content.trim() && content.length <= 500
                  ? "hover:text-text/10"
                  : "text-text-muted cursor-not-allowed bg-blue-500/50"
              }`}
              disabled={!content.trim() || content.length > 500}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
