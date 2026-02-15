export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const [month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
