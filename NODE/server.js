// import server from './server.js';

import express from 'express'; // new way of importing modules in Node.js, using ES6 module syntax
// const express = require('express'); // old way of importing modules in Node.js, using CommonJS syntax


const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






