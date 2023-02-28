require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const defineToken = (id) => jwt.sign({ data: { id } }, secret, jwtConfig);

module.exports = defineToken;
