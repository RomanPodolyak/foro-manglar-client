exports.validateObjectId = function (objectId) {
  return /^[0-9a-f]{24}$/.test(objectId);
};
exports.validateUsername = function (username) {
  return /^[-0-9_a-zA-ZáéíóúñüÁÉÍÓÚÑÜ]{5,24}$/.test(username);
};
exports.validatePassword = function (password) {
  return (
    password.length >= 10 &&
    password.length <= 1000 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
};
exports.validateEmail = function (email) {
  return /^[a-zA-Z0-9!#$%&’*+\-/=?^_{|}~](?:[a-zA-Z0-9!#$%&’*+\-/=?^_{|}~.][a-zA-Z0-9!#$%&’*+\-/=?^_{|}~]+)*@[a-zA-Z0-9[](?:[a-zA-Z0-9-.][a-zA-Z0-9-]+)*\.[a-zA-Z0-9-]*[a-zA-Z0-9\]]$/.test(
    email
  );
};
exports.validateDescription = function (description) {
  return description.length <= 500;
};
exports.validateTitle = function (title) {
  return title.length >= 10 && title.length <= 200;
};
exports.validateContent = function (content) {
  return content.length <= 5000;
};
