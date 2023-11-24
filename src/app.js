// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

/**
 * @typedef {Object} User
 * @property {number} id - User ID.
 * @property {string} username - User's username.
 * @property {string} email - User's email address.
 */

/**
 * Get all users.
 *
 * @route GET /users
 * @returns {User[]} - Array of users.
 * @throws {Error} - Throws an error if there's an issue fetching users.
 */
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Add a new user.
 *
 * @route POST /users
 * @param {string} req.body.username - User's username.
 * @param {string} req.body.email - User's email address.
 * @returns {User} - The newly created user.
 * @throws {Error} - Throws an error if there's an issue creating the user.
 */
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
