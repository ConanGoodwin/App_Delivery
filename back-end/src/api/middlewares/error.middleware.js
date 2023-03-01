const typesError = require('../utils/mapError');

const errorMiddleware = (error, _req, res, _next) => {
  const { type, message } = error;

  res.status(typesError[type]).json({ message });
};

module.exports = errorMiddleware;