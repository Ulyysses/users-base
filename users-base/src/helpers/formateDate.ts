export const formatLastLoginDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric"
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  };