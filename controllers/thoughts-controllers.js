const { Thoughts, User } = require('../models');

const thoughtsController = {
        createThoughts({ params, body } res) {
            Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            }).then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found.' });
                    return;
                }
                res.json(dbThoughtsData);
            }).catch(err => res.json(err));
        },

        getAllThoughts (req, res) {
            Thoughts.find({ })
            .populate({ path: 'reactions', select: '-__v'})
            .select('-__v')
            .sort({ _id: 1 })
            .then(dbThoughtsData => res.jso(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(404).json(err)
            });
        },

        getThoughtsById ({ params }, res) {
            Thoughts.findOne ({ _id: params. id })
            .populate ({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData) {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found. ' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
        },

        addReaction ({ params, body }, res) {
            Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reaction: body }},
                { new: true, runValidators: true }
            ).populate({ path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found.' });
                return;
            }
            res.json(dbThoughtsData)
        }).catch(err => res.json(err));
    },

        deleteReaction({ params }, res) {
            Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: {reactionsId: params.reactionsId }}},
                { new: true }
            ).then(dbThoughtsData) {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found.' });
                    return;
            }
            res.json(dbThoughtsData)
        }).catch(err => res.json(400).json(err));
    },

    updateThoughts ({ params, body }, res) {
        Thoughts.findOneAndUpdate (
            { _id: params.id },
            body,
            { new: true, runValidators: true } 
        ).populate({ path: 'reactions', select: '-__v' })
        ,select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found.' });
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err => res.json(err));
    },

    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete ({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found.' });
                return;
            }
            res.json(dbThoughtsData);
        }).catch(err=> res.status(400).json(err));
    },
};

module.exports = thoughtsController;

