const maxTitleLength = 300;

const trimmedText = (title) => {
  return title.length > maxTitleLength
    ? title.substring(0, maxTitleLength) + "..."
    : title;
};

export default trimmedText;
