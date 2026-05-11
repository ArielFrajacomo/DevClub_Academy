///////////////////////////////////
//#region MongoDB+Prisma
///////////////////////////////////

import express from 'express'; // new way of importing modules in Node.js, using ES6 module syntax
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js'; // Importing the PrismaClient class from the custom Prisma output
import { User } from './server-classes.js'; 

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const prisma = new PrismaClient(); // Creating an instance of PrismaClient to interact with the database
const mongoUser = new User();

// =============================================
// STATIC FILE SERVING (FRONTEND)
// =============================================
// This tells Express: "If the browser asks for index.html, styles.css, scripts.js
// or any other file in this folder, just send it directly."
// 
// Why we need this:
// - the server is now a real full-stack app (API + website)
// - Without this line the browser gets "Cannot GET /" because Express
//   only knows API routes like /users, not the actual webpage.
// 
// The __dirname part is needed because we use ES modules (import/export).
// It finds the current folder automatically on both local and Render.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname));

const DEBUG = false; // Set to false in production

//get users from MongoDB
//if theres no ID in the request body, return all users, otherwise, return the user with the specified ID
app.get('/users', async (req, res) => {
  let users = null; 

  if (DEBUG) {
    console.log('Received GET /users request with query:', req.query); // Log the incoming query parameters
  }

  if (req.query?.id && req.query?.id?.trim() !== '') {
    // If an ID is provided in the query parameters, find the user with that ID
    users = await prisma.user.findUnique({
      where: { id: req.query.id }
    });

    if (DEBUG) {
      console.log('User found by ID:', users);
    }
  } else if (req.query?.name && req.query?.name?.trim() !== '') {
    // If a name is provided in the query parameters, find the user with that name
    users = await prisma.user.findMany({
      where: { 
        name: {
          contains: req.query.name, // Use 'contains' for partial matching
          mode: 'insensitive' // Case-insensitive search
        }
      }
    });
    if (DEBUG) {
      console.log('Users found by name:', users);
    }
  } else {
    // If no ID or name is provided, return all users
    users = await prisma.user.findMany();

    if (DEBUG) {
      console.log('All users:', users);
    }
  }
  res.status(200).json(users);
});

//add new user on MongoDB
app.post('/users', async (req, res) => {
  mongoUser.getFromJson(req.body); // Update the mongoUser instance with data from the request body

  if (DEBUG) {
    console.log('Received POST /users request with body:', req.body); // Log the incoming request body
  }

  if (mongoUser.checkId()) {
    return res.status(400).json({ message: 'User ID should not be provided when creating a new user.' });
  }
  if (!mongoUser.isValid()) {
    return res.status(400).json({ message: 'Invalid user data.' });
  }

  const newUser = await prisma.user.create({
    data: {
      email: mongoUser.email,
      name: mongoUser.name,
      age: mongoUser.age
    }
  });
  try {
    if (mongoUser.equalData(newUser)) {
      res.status(201).json(newUser);

      if (DEBUG) {
        console.log('User created successfully:', newUser);
      }
    } else { // This case is unlikely, created to train error handling and rollback
      res.status(500).json({ message: 'Failed to create user.' });
      deleteUserByID(newUser.id); // Rollback: delete the user if the data doesn't match
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user.', error: error.message });
  }
});

//update an existing user on MongoDB
app.put('/users', async (req, res) => {
  mongoUser.getFromJson(req.body); // Update the mongoUser instance with data from the request body

  if (DEBUG) {
    console.log('Received PUT /users request with body:', req.body); // Log the incoming request body
  }

  if (!mongoUser.checkId()) {
    return res.status(400).json({ message: 'User ID is required for update.' });
  }
  if (mongoUser.id.trim() === '69ef545dd6c918256c47c58d') { 
    //easteregg, no one can delete me, not even me, the creator
    return res.status(400).json({ message: 'This user is too powerful and cannot be changed!' });
  }
  if (!mongoUser.isValid()) {
    return res.status(400).json({ message: 'Invalid user data.' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: mongoUser.id },
      data: {
        email: mongoUser.email,
        name: mongoUser.name,
        age: mongoUser.age
      }
    });
    res.status(200).json(updatedUser);
    if (DEBUG) {
      console.log('User updated successfully:', updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.', error: error.message });
  }
});

//delete a user by name on MongoDB
app.delete('/users', async (req, res) => {

  if (DEBUG) {
    console.log('Received DELETE /users request with body:', req.body); // Log the incoming request body
  }

  if (!req.body?.id || req.body.id.trim() === '69ef545dd6c918256c47c58d') {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  deleteUserByID(req.body.id)
    .then(() => {
      if (DEBUG) {
        console.log('User deleted successfully:', req.body.id);
      }
      res.status(200).json({ message: 'User deleted successfully.' });
    })
    .catch(error => res.status(500).json({ message: 'Failed to delete user.', error: error.message }));
});
function deleteUserByID(id) {
  // Implement the function to delete a user by ID
  return prisma.user.delete({
    where: { id }
  });
}
//#endregion MongoDB+Prisma

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});