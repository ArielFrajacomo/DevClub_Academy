///////////////////////////////////
//#region MongoDB+Prisma
///////////////////////////////////

import express from 'express'; // new way of importing modules in Node.js, using ES6 module syntax
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js'; // Importing the PrismaClient class from the custom Prisma output
import { User } from './server-classes.js'; 

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const prisma = new PrismaClient(); // Creating an instance of PrismaClient to interact with the database
const mongoUser = new User();
const port = 3000; // Define the port number

//get users from MongoDB
//if theres no ID in the request body, return all users, otherwise, return the user with the specified ID
app.get('/users', async (req, res) => {
  let users = null; 
  if (req.query?.id && req.query?.id?.trim() !== '') {
    // If an ID is provided in the query parameters, find the user with that ID
    users = await prisma.user.findUnique({
      where: { id: req.query.id }
    });
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
  } else {
    // If no ID or name is provided, return all users
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

//add new user on MongoDB
app.post('/users', async (req, res) => {
  mongoUser.getFromJson(req.body); // Update the mongoUser instance with data from the request body

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

  if (!mongoUser.checkId()) {
    return res.status(400).json({ message: 'User ID is required for update.' });
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.', error: error.message });
  }
});

//delete a user by name on MongoDB
app.delete('/users', async (req, res) => {
  deleteUserByID(req.body.id)
    .then(() => res.status(200).json({ message: 'User deleted successfully.' }))
    .catch(error => res.status(500).json({ message: 'Failed to delete user.', error: error.message }));
});
function deleteUserByID(id) {
  // Implement the function to delete a user by ID
  return prisma.user.delete({
    where: { id }
  });
}
//#endregion MongoDB+Prisma


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});