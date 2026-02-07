// --------------------------------------
// Multiple fromats Date Handler
// --------------------------------------
export const formatDate = dateString => {
  if (!dateString) return "Recently";

  try {
    let date;
    if (typeof dateString === "string") {
      // If it's in MySQL datetime format (YYYY-MM-DD HH:MM:SS)
      if (dateString.includes(" ") && dateString.includes(":")) {
        date = new Date(dateString.replace(" ", "T") + "Z");
      } else {
        date = new Date(dateString);
      }
    } else {
      date = new Date(dateString);
    }
    // Check date validity
    if (isNaN(date.getTime())) {
      return "Recently";
    }
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
};
