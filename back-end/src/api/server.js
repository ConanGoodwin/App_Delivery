const express = require('express');
const path = require('path')
// const port = process.env.PORT || 3001;
const app = require('./app');

// app.listen(port);
// console.log(`Api rodando na porta ${port}`);

const PORT = process.env.PORT || 3001

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
