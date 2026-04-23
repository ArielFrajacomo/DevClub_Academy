// import server from './server.js';

import express from 'express'; // new way of importing modules in Node.js, using ES6 module syntax
// const express = require('express'); // old way of importing modules in Node.js, using CommonJS syntax


const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//req is the request object that contains information about the incoming request, such as query parameters, headers, and body data. 
//res res is the response object that allows you to send a response back to the client.

app.get('/getBurgerList', (req, res) => {
    const list =  [
        { "name": "X-Salada", "qtd": 0, "price": 30, "vegan": false, "src": "./assets/xsalada.jpeg"},
        { "name": "X-Bacon", "qtd": 0, "price": 34, "vegan": false, "src": "./assets/xbacon.png" },
        { "name": "X-Bacon Egg", "qtd": 0, "price": 39, "vegan": false, "src": "./assets/bacon-egg.png" },
        { "name": "Monstruoso", "qtd": 0, "price": 50, "vegan": false, "src": "./assets/monstruoso.png" },
        { "name": "Big Vegano", "qtd": 0, "price": 55, "vegan": true, "src": "./assets/xvegan.png" },
        { "name": "X-Vegan", "qtd": 0, "price": 45, "vegan": true, "src": "./assets/monstruoso-vegan.png" },
        { "name": "A Moda", "qtd": 0, "price": 75, "vegan": false, "src": "" }
    ]
    res.json(list); 
    // sends the list of burgers as a JSON response to the client, 
    // it can be accessed in the client-side JavaScript using fetch or XMLHttpRequest to retrieve the data and display it on the webpage.
    // it can be seeing in the console of the browser when the client makes a request to the /getBurgerList endpoint, it will log the list of burgers in JSON format.
});




//app.listen(port) // starts the server and listens on the specified port 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});





