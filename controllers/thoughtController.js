const { Thought, User } = require("../models");

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            
            .catch((err) => res.status(500).json(err));
            
    },

    getThoughtWithId(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: "No matching thought" })
                : res.json(thought)
            
            )
            .catch((err) =>
                res.status(500).json(err));
    },

    newThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThoughtWithId(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: "no thought with that ID" })
            :res.json(thought)
            )
        .catch((err) => res.status(500).json(err));
    },

    deleteThoughtWithId(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: " no thought matching that ID" })
                : User.deleteOne({ _id: { $in: thought.users}})
            )
                
            .then(() => res.json({ message: 'Thought deleted'}))
            .catch((err) => res.status(500).json(err));
    },

};