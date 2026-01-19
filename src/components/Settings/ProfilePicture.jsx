import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import useProfile from "../../hooks/states/useProfile";
import { uploadProfilePicture, deleteProfilePicture } from "../../api/media.api";
import AlertMessage from "../UI/AlertMessage";
import { getValidProfilePictureUrl, getUserInitials } from "../../utils/profile/profileUtils";

export default function ProfilePicture() {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState(null);
  const fileInputRef = useRef(null);
  const user = useProfile();

  const initials = getUserInitials(user);

  const handleFileUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match(/image\/(jpeg|png)/)) {
      setAlert({ message: "Please upload a PNG or JPEG image", statusCode: 400 });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      // 15MB
      setAlert({ message: "File size must be less than 15MB", statusCode: 400 });
      return;
    }

    setIsUploading(true);
    setAlert(null);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePicture(previewUrl);

      // Upload to server
      const result = await uploadProfilePicture(file);

      if (result.status === 200) {
        setAlert({ message: "Profile picture updated successfully", statusCode: 200 });
        // Update the profile picture URL in the preview
        if (result.profilePictureUrl) {
          setProfilePicture(result.profilePictureUrl);
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setAlert({ message: "Upload failed. Please try again.", statusCode: 500 });
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

  const handleDelete = async () => {
    try {
      setAlert(null);
      const result = await deleteProfilePicture();

      if (result.status === 200) {
        setProfilePicture(null);
        setAlert({ message: "Profile picture removed successfully", statusCode: 200 });
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setAlert({ message: "Failed to remove profile picture. Please try again.", statusCode: 500 });
    }
  };

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-tertiary text-lg font-semibold text-text-primary">
            {profilePicture ? (
              <img src={profilePicture} className="h-full w-full object-cover" />
            ) : getValidProfilePictureUrl(user.profile_picture_url) ? (
              <img src={getValidProfilePictureUrl(user.profile_picture_url)} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">{t("settings.profile_picture")}</p>
            <p className="text-xs text-text-muted">{t("settings.profile_picture_subtitle")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/50 transition-colors">
            {isUploading ? t("settings.uploading") : t("settings.upload_new_picture")}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              disabled={isUploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {(profilePicture || getValidProfilePictureUrl(user.profile_picture_url)) && (
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
