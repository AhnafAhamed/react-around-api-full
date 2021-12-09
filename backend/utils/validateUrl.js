const validator = require('validator');

module.exports = (string) => {
  if (!validator.isUrl(string)) {
    throw new Error('Invalid Url');
  }
  return string;
};
