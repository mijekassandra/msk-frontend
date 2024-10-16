export const formatDateTime = (isoDateString) => {
  if (!isoDateString) return ""; // Handle null or undefined values

  const date = new Date(isoDateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Format date in MM/DD/YYYY format with 12-hour time (AM/PM)
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
