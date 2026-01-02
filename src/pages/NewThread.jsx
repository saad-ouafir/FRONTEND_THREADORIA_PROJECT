import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiImage, FiX, FiSend } from "react-icons/fi";

export default function NewThread() {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setContent("");
      setImages([]);
      setIsSubmitting(false);
      // Navigate back to home or threads page
      window.history.back();
    }, 1500);
  };

  const handleCancel = () => {
    if (content.trim() || images.length > 0) {
      if (confirm("Are you sure you want to discard this thread?")) {
        setContent("");
        setImages([]);
        window.history.back();
      }
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
            <h1 className="text-xl font-bold text-text-primary">New Thread</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() && images.length === 0 || isSubmitting}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              content.trim() || images.length > 0
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-bg-tertiary text-text-muted cursor-not-allowed"
            } ${isSubmitting ? "opacity-50" : ""}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Posting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FiSend className="w-4 h-4" />
                Post
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Thread Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Text Input */}
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start a thread..."
              className="w-full min-h-[120px] p-4 text-lg bg-transparent border-none outline-none resize-none text-text-primary placeholder-text-muted"
              maxLength={500}
            />
            <div className="text-right text-sm text-text-muted mt-2">
              {content.length}/500
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary hover:bg-bg-tertiary/80 rounded-lg cursor-pointer transition-colors"
              >
                <FiImage className="w-5 h-5 text-text-secondary" />
                <span className="text-text-secondary text-sm">Add Image</span>
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thread Options */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Who can reply</span>
              </label>
            </div>
            <div className="text-sm text-text-muted">
              Anyone can reply
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
