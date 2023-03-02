const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const FILE_PATH = '../../../';

const secret = fs.readFileSync(path.resolve(__dirname, `${FILE_PATH}/jwt.evaluation.key`), 'utf8');

const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const defineToken = (id) => jwt.sign({ data: { id } }, secret, jwtConfig);

module.exports = defineToken;
