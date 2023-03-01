const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/user', userRouter);
app.use('/images', express.static('public/images'));

module.exports = app;
