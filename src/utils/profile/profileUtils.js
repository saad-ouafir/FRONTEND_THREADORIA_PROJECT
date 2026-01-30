import GlobalStore from "../../context/GlobalStore";
import { setProfileData } from "../../context/ProfileSlice";

export default function setProfile(userData) {
  return GlobalStore.dispatch(setProfileData(userData));
}

// Utility functions for profile-related operations
export function getValidProfilePictureUrl(profilePictureUrl) {
  if (!profilePictureUrl || typeof profilePictureUrl !== "string") {
    return null;
  }

  // Trim whitespace
  const trimmedUrl = profilePictureUrl.trim();

  // Check if it's a valid HTTP/HTTPS URL
  try {
    const url = new URL(trimmedUrl);

    // Ensure it's an HTTP/HTTPS URL
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    // Fix common typo in Google Cloud Storage URLs
    if (trimmedUrl.includes("storage.googleapiscom")) {
      return trimmedUrl.replace("storage.googleapiscom", "storage.googleapis.com");
    }

    return trimmedUrl;
  } catch {
    // Invalid URL format
    return null;
  }
}

/**
 * Gets user initials from full name or username
 * @param {Object} user - User object with full_name and username
 * @returns {string} - User initials (max 2 characters)
 */
export function getUserInitials(user) {
  if (!user) return "U";

  const fullName = user.full_name || user.username || "User";
  return fullName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Gets a safe profile picture URL with fallback handling
 * @param {Object} user - User object
 * @param {string} fallbackUrl - Optional fallback URL
 * @returns {string|null} - Valid profile picture URL or null
 */
export function getProfilePictureUrl(user, fallbackUrl = null) {
  if (!user) return fallbackUrl;

  // Try profile_picture_url first
  const primaryUrl = getValidProfilePictureUrl(user.profile_picture_url);
  if (primaryUrl) return primaryUrl;

  // Try fallback URL if provided
  const fallback = getValidProfilePictureUrl(fallbackUrl || user.avatar_url);
  if (fallback) return fallback;

  return null;
}

/**
 * Gets display name from user object with fallbacks
 * @param {Object} user - User object
 * @returns {string} - Display name
 */
export function getDisplayName(user) {
  return user?.full_name || user?.fullName || user?.name || "Unknown";
}

/**
 * Gets username from user object with fallbacks
 * @param {Object} user - User object
 * @returns {string} - Username
 */
export function getUsername(user) {
  return user?.username || user?.handle || "";
}

export function getFollowButtonConfig(followStatus, t, options = {}) {
  const { namespace = "rightbar" } = options;

  const configs = {
    ACCEPTED: {
      label: t(`${namespace}.following`),
      className: "bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80",
    },
    PENDING: {
      label: t(`${namespace}.requested`),
      className: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
    },
  };

  return (
    configs[followStatus] || {
      label: t(`${namespace}.follow`),
      className: "bg-accent text-white hover:bg-accent-hover active:scale-[0.97]",
    }
  );
}
