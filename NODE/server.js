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

const burgerItem = {
    "name": "",
    "qtd": 0,
    "price": 0,
    "vegan": false,
    "src": ""
}

//
//    Burgerlist Area
//


// sends the list of burgers as a JSON response to the client, 
// used Thunderclient to test the endpoint and received the list of burgers in the response body.
app.get('/BurgerList', (req, res) => {
    res.json(burgerList); 
});

//Post creates new BurgerList (from the zero) on the server.
app.post('/BurgerList', (req, res) => {
  // Expecting an array of burgers in req.body
  if (Array.isArray(req.body)) {
    // Add new burgers to the burgerList
    req.body.forEach(newBurger => {
      // Check if a burger with the same name already exists
      const exists = burgerList.some(b => b.name === newBurger.name);
      if (!exists) {
        burgerList.push(newBurger);
      }
    });
    res.status(201).json(burgerList); // Return the updated burger list with a 201 Created status.
  } else {
    res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }
});

//Patch updates existing BurgerList on the server. 
app.patch('/BurgerList', (req, res) => {
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

//Delete removes BurgerList from the server.
app.delete('/BurgerList', (req, res) => {
  // Expecting an array of burger names in req.body
  if (Array.isArray(req.body)) {
    // Remove burgers that match the names in the request body
    req.body.forEach(name => {
      const index = burgerList.findIndex(b => b.name === name);
      if (index !== -1) {
        burgerList.splice(index, 1);
      }
    });
    res.status(200).json(burgerList); // Return the updated burger list with a 200 OK status.
  } else {
    res.status(400).json({ message: 'Invalid data format. Expected an array of names.' });
  }
});

//
//    BurgerItem Area
//

app.post('/BurgerItem', (req, res) => {
  // Expecting a single burger item in req.body
  const newBurger = req.body;
  if (newBurger && newBurger.name) {
    // Check if a burger with the same name already exists
    const exists = burgerList.some(b => b.name === newBurger.name);
    if (!exists) {
      burgerList.push(newBurger);
      res.status(201).json(newBurger); // Return the newly created burger item with a 201 Created status.
    } else {
      res.status(409).json({ message: 'Burger with the same name already exists.' }); // Conflict status code
    }
  } else {
    res.status(400).json({ message: 'Invalid burger data.' }); // Bad Request status code 
  }
});

app.get('/BurgerItem/:name', (req, res) => {
  const burgerName = req.params.name;
  const burger = burgerList.find(b => b.name === burgerName);
  if (burger) {
    res.json(burger); // Return the found burger item
  } else {
    res.status(404).json({ message: 'Burger not found.' }); // Not Found status code
  }
});

app.put('/BurgerItem/:name', (req, res) => {
  const burgerName = req.params.name;
  const updatedBurger = req.body;
  const index = burgerList.findIndex(b => b.name === burgerName);

  if (index !== -1) {
    // Update the burger item at the found index
    burgerList[index] = { ...burgerList[index], ...updatedBurger };
    res.json(burgerList[index]); // Return the updated burger item
  } else {
    res.status(404).json({ message: 'Burger not found.' }); // Not Found status code
  }
});

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

Alternatively, you can use the following command to automatically restart the server whenever you make changes to the server.js file:
  node --watch server.js 

!!but don't forget to go to the folder.
!!in this case, you need to run the following command:
    
    cd NODE 
    node --watch server.js

*/