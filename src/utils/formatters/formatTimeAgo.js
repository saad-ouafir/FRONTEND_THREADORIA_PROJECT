// --------------------------------------
// Time Format Handler (past year, month ...)
// --------------------------------------

export default {
  formatTimeAgo,
  formatFullDate,
};
const UNITS = [
  { label: "y", seconds: 31536000 },
  { label: "mo", seconds: 2592000 },
  { label: "w", seconds: 604800 },
  { label: "d", seconds: 86400 },
  { label: "h", seconds: 3600 },
  { label: "m", seconds: 60 },
];

// Helper to normalize dates once
const parseDate = dateString => {
  if (!dateString) return null;
  let d =
    typeof dateString === "string" && dateString.includes(" ") && dateString.includes(":")
      ? new Date(dateString.replace(" ", "T") + "Z")
      : new Date(dateString);

  return isNaN(d.getTime()) ? null : d;
};

// format time ago
export function formatTimeAgo(dateString) {
  const createdAt = parseDate(dateString);
  if (!createdAt) return "Recently";

  const diffInSeconds = Math.floor((Date.now() - createdAt) / 1000);

  if (diffInSeconds < 60) return "Just now";

  // Optimized Loop: Stops as soon as it finds the right unit
  for (const { label, seconds } of UNITS) {
    if (diffInSeconds >= seconds) {
      return `${Math.floor(diffInSeconds / seconds)}${label} ago`;
    }
  }
  return "Recently";
}

// Cache the formatter for better performance
const defaultFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// format the full date
export function formatFullDate(dateString, options = null) {
  const date = parseDate(dateString);
  if (!date) return "Unknown";
  return options ? date.toLocaleDateString(undefined, options) : defaultFormatter.format(date);
}
