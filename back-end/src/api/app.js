const express = require('express');
const { userRouter } = require('./routes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/user', userRouter);

module.exports = app;
