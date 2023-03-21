const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const FILE_PATH = '../../../';

const secret = fs.readFileSync(path.resolve(__dirname, `${FILE_PATH}/jwt.evaluation.key`), 'utf8');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);

    req.id = decoded.data.id;

    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      const err = new Error('Expired or invalid token');
      err.type = 'EXPIRED_OR_INVALID_TOKEN';

      throw err;
    }
    return res.status(401).json({ message: error.message });
  }
};