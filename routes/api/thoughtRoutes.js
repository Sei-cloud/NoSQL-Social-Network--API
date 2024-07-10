// Import router from express
const router = require('express').Router();

// Importing thought and reaction logic from thoughtController
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
// Get all thoughts, create a thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Routes for /api/thoughts/:thoughtId
// Get a single thought, update a thought, delete a thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Route for /api/thoughts/:thoughtId/reactions
// Add a reaction
router.route('/:thoughtId/reactions')
    .post(addReaction);

// Route for /api/thoughts/:thoughtId/reactions/:reactionId
// Delete a reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;