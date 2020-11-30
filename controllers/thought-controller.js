const { Thought, User } = require('../models');
const { param } = require('../routes');

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // GET one thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // POST a new thought
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No pizza found with this id! '});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // PUT to update a thought by it's _id
    updateThought({ params, body }, res ) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to remove thought by it's _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            return User.findOneAndUpdate(
                { _Id: params.UserId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true}
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;