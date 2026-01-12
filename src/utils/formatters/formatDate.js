export const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  
  try {
    let date;
    
    // Handle different date formats
    if (typeof dateString === 'string') {
      // If it's in MySQL datetime format (YYYY-MM-DD HH:MM:SS)
      if (dateString.includes(' ') && dateString.includes(':')) {
        date = new Date(dateString.replace(' ', 'T') + 'Z');
      } else {
        date = new Date(dateString);
      }
    } else {
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Recently";
    }
    
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error, "for date:", dateString);
    return "Recently";
  }
};
