const validateURL = (url) => {
  const expression =
    /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/gi;
  const regex = new RegExp(expression);
  return url.match(regex);
};

module.exports = validateURL;
