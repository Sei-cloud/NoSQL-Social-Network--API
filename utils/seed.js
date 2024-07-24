const connection = require('../config/connection');

const { User, Thought } = require('../models');

const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

// After connecting to the database, start seed data
connection.once('open', async () => {
    // Logging to the console that the seed functions have begun
    console.log('Seed function connected');

    // Deleting any existing users from the database
    await User.deleteMany({});

    // Deleting any existing thoughts from the database
    await Thought.deleteMany({});

    // Creating an empty array to hold the user data
    const users = [];

    // Create 20 random users
    for (let i = 0; i < 20; i++) {
        // Getting random username
        const username = `${getRandomName() + [i]}`;
        // Create email from username
        const email = `${username}@exampleseed.com`;

        // Adding each user to the users table
        users.push({
            username,
            email,
            thoughts: [],
            friends: [],
        });
    }

    // Adding all users to the user collection
    if (users.length > 0) {
        await User.collection.insertMany(users);
    }

    // An empty array to hold thoughts
    const thoughts = [];

    // Creating 20 random thoughts
    for (let i = 0; i < 20; i++) {
        // Getting random thoughts
        const thoughtText = getRandomThought();
        // Getting random user from users by generating random index
        const username = users[Math.floor(Math.random() * users.length)].username;

        // Adding each thought to the thoughts table
        thoughts.push({
            thoughtText,
            username,
            reactions: [],
        });
    }

    // Adding thoughts to the thoughts collection
    if (thoughts.length > 0) {
        await Thought.collection.insertMany(thoughts);
    }

    // Adding thoughts to user data by iterating though thoughts table
    for (let i = 0; i < thoughts.length; i++) {
        // Getting username and thought ID
        const { _id, username } = thoughts[i];
        // updating user thoughts using username
        await User.updateOne(
            { username: username },
            { $push: { thoughts: _id } }
        );
    }

    // Log that seeding has been completed
    console.log('Seeding complete')

    // End the seed process
    process.exit(0);
});