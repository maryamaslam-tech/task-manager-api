// utils/formatDate.js
const formatDate = (date) => {
  if (!date) return null;

  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

module.exports = formatDate;
