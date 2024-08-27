export const formatDate = (d: string) => {
  const date = new Date(d);

  const dateWithTime = date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });
  const dateWithoutTime = date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return {
    dateWithTime,
    dateWithoutTime,
  };
};
