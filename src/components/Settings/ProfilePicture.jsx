import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

export default function ProfilePicture() {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Get user initials from localStorage or use default
  const getUserInitials = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const fullName = user.full_name || user.username || "User";
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getUserInitials();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match(/image\/(jpeg|png)/)) {
      alert("Please upload a PNG or JPEG image");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      // 15MB
      alert("File size must be less than 15MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(previewUrl);

      // TODO: Upload to server
      // const formData = new FormData();
      // formData.append('profilePicture', file);
      // await uploadProfilePicture(formData);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      // Revert to previous state on error
      setProfilePicture(null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = () => {
    setProfilePicture(null);
    // TODO: Delete from server
    // await deleteProfilePicture();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-tertiary text-lg font-semibold text-text-primary">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">
              {t("settings.profile_picture")}
            </p>
            <p className="text-xs text-text-muted">
              {t("settings.profile_picture_subtitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/50 transition-colors">
            {isUploading
              ? t("settings.uploading")
              : t("settings.upload_new_picture")}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              disabled={isUploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {profilePicture && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            >
              {t("settings.delete")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
