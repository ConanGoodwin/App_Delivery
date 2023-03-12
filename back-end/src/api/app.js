const express = require('express');
const cors = require('cors');
const { userRouter, productRouter, salesRouter } = require('./routes');
const { salesProductsRouter, admRouter } = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/sales', salesRouter);
app.use('/salesProducts', salesProductsRouter);
app.use('/adm', admRouter);
app.use('/images', express.static('public/images'));

module.exports = app;
// teste