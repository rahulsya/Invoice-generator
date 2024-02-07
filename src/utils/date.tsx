export const FormatDate = (date: Date, option: boolean = true) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (option == false) {
    return new Date(date).toLocaleDateString("en-GB");
  }
  return new Date(date).toLocaleDateString("en-ID", options as any);
};
