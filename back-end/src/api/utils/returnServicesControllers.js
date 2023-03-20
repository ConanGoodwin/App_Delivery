const defineToken = require('../auth/token');
const typesError = require('./mapError');

const returnServiceIfNull = (check, type, message) => {
  if (check) return { type: null, message: check };
  
  return { type, message };
};

const returnControllerToken = (res, type, message, status) => {
  if (type) return res.status(typesError[type]).json({ message });

  return res.status(status)
    .json({ token: defineToken(message.id), role: message.role, name: message.name });
};

const returnController = (res, type, message, status) => {
  if (type) return res.status(typesError[type]).json({ message });

  return res.status(status).json(message);
};

module.exports = { 
  returnServiceIfNull,
  returnController,
  returnControllerToken,
};