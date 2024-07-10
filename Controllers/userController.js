const { User, Thought } = require('../models');

module.exports = {
    // Get ALL users
    getUsers(req, res) {
        User.find()
            // taking the response data
            .then((users) => res.json(users))
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // Excluding mongoose's version key
            .select('-__v')
            // populating thoughts and friends that are related to that user
            .populate('thoughts')
            .populate('friends')
            // taking the response data
            .then((user) =>
                // If a user isn't found,
                !user
                    // then return error
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    // but if user data is found, return the data
                    : res.json(user)
            )
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createUser(req, res) {
        // using data from request
        User.create(req.body)
            // responding with the new user data
            .then((user) => res.json(user))
            // catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Update a user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            // getting user data from request parameters
            { _id: req.params.userId },
            // updating user from the request
            { $set: req.body },
            // validating data and returning updated data
            { runValidators: true, new: true }
        )
            // taking the response data
            .then((user) =>
                // If a user isn't found,
                !user
                    // then return error
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    // but if user data is found, return the data
                    : res.json(user)
            )
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            // taking the response data
            .then((user) =>
                // If a user isn't found,
                !user
                    // then return error
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    // but if user data is found, return the data
                    : res.json(user)
            )
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            // Taking ID from request parameter
            { _id: req.params.userId },
            // adding the friend to the user's data
            { $addToSet: { friends: req.params.friendId } },
            // validating data and responding with the udpated data
            { runValidators: true, new: true }
        )
            // taking the response data
            .then((user) =>
                // If a user isn't found,
                !user
                    // then return error
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    // but if user data is found, return the data
                    : res.json(user)
            )
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },

    // Remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            // Taking ID from request parameter
            { _id: req.params.userId },
            // removing the friend from the user's data
            { $pull: { friends: req.params.friendId } },
            // validating data and responding with the udpated data
            { runValidators: true, new: true }
        )
            // taking the response data
            .then((user) =>
                // If a user isn't found,
                !user
                    // then return error
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    // but if user data is found, return the data
                    : res.json(user)
            )
            // Catching errors and displaying them
            .catch((err) => res.status(500).json(err));
    },
};