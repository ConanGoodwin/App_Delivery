<<<<<<< HEAD
const port = process.env.PORT || 3001;
const app = require('./app');

app.listen(port);
console.log(`Api rodando na porta ${port}`);
=======
const express = require('express');
const path = require('path')
// const port = process.env.PORT || 3001;
const app = require('./app');

// app.listen(port);
// console.log(`Api rodando na porta ${port}`);

const PORT = process.env.PORT || 3001
// const HOST = process.env.HOSTNAME || '0.0.0.0';

app
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, '0.0.0.0',0, () => console.log(`Listening on ${ PORT }`))
>>>>>>> refactor-railway
