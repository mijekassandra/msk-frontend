export const formatDate = (isoDateString: string | null | undefined): string => {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
