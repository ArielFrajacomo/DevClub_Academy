// import server from './server.js';

import express from 'express'; // new way of importing modules in Node.js, using ES6 module syntax
// const express = require('express'); // old way of importing modules in Node.js, using CommonJS syntax


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});


//req is the request object that contains information about the incoming request, such as query parameters, headers, and body data. 
//res is the response object that allows you to send a response back to the client.
app.post('/example', (req, res) => {
    res.json({ message: 'Item submitted successfully' });
});


//
//    Burgerlist Area
//

//simulates a database of burgers, which can be accessed and modified through the defined routes.
const burgerList = [
    { "name": "X-Salada", "qtd": 0, "price": 30, "vegan": false, "src": "./assets/xsalada.jpeg"},
    { "name": "X-Bacon", "qtd": 0, "price": 34, "vegan": false, "src": "./assets/xbacon.png" },
    { "name": "X-Bacon Egg", "qtd": 0, "price": 39, "vegan": false, "src": "./assets/bacon-egg.png" },
    { "name": "Monstruoso", "qtd": 0, "price": 50, "vegan": false, "src": "./assets/monstruoso.png" },
    { "name": "Big Vegano", "qtd": 0, "price": 55, "vegan": true, "src": "./assets/xvegan.png" },
    { "name": "X-Vegan", "qtd": 0, "price": 45, "vegan": true, "src": "./assets/monstruoso-vegan.png" },
    { "name": "A Moda", "qtd": 0, "price": 75, "vegan": false, "src": "" }
]

// sends the list of burgers as a JSON response to the client, 
// used Thunderclient to test the endpoint and received the list of burgers in the response body.
app.get('/BurgerList', (req, res) => {
    res.json(burgerList); 
});

app.post('/BurgerList', (req, res) => {
  // Expecting an array of burgers in req.body
  if (Array.isArray(req.body)) {
    // Update only burgers that match by 'name'
    req.body.forEach(incomingBurger => {
      const existing = burgerList.find(b => b.name === incomingBurger.name);
      if (existing) {
        // Update only the fields present in the incoming burger
        Object.keys(incomingBurger).forEach(key => {
          if (key !== 'name') {
            existing[key] = incomingBurger[key];
          }
        });
      }
    });
    res.status(202).json(burgerList); // Return the updated burger list with a 202 Accepted status.
  } else {
    res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }
});

app.






//app.listen(port) // starts the server and listens on the specified port 
//must be called after defining all the routes and middleware to ensure that the server is properly set up before it starts accepting requests.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/* DONT FORGET

installing express, you need to run the following commands in your terminal:
  npm init -y
  npm install express

running the server, you can use the following command in your terminal:
  node server.js

!!but don't forget to go to the folder.
!!in this case, you need to run the following command:
    
    cd NODE 
    node server.js

*/