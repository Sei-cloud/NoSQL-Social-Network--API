// importing thought and user models
const { Thought, User } = require("../models");

// defining and exporting thought route logic
module.exports = {
  // Get ALL thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      // catching errors
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought from its ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : 
            res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)

      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },

          { $addToSet: { thoughts: thought._id } },

          { new: true }
        );
      })
      .then((user) =>
        !user
          ?
            res.status(404).json({
              message: "Thought created, but no user found to attribute it to",
            })
          : 
            res.json("Created thought")
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? 
            res.status(404).json({ message: "No thought with this ID" })
          :
            res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ?
            res.status(404).json({ message: "No thought with this ID" })
          :
            User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
            
              { $pull: { thoughts: req.params.thoughtId } },
            
              { new: true }
            )
      )
      .then((user) =>
        !user
          ?
            res.status(404).json({
              message: "Thought deleted, but no user found with this ID",
            })
          : 
            res.json({ message: "Thought deleted and user updated" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },

      { $addToSet: { reactions: req.body } },

      { runValidators: true, new: true }
    )
      // Taking thought data
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },

      { $pull: { reactions: { reactionId: req.params.reactionId } } },

      { runValidators: true, new: true }
    )
      // Taking thought data
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(thought)
      )

      .catch((err) => res.status(500).json(err));
  },
};
