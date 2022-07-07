const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        USer.find({ })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        });
    },

    getUserById ({ params }, res) {
        User.fineOne ({ _id: params.id })
        .populate ({
            path: 'thoughts',
            select: '-__v'
        })
        .populate ({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found '});
                return;
            }
            res.json(dbUserData)
        }).catch(err => {
            console.log(err)
            res.status(404).json(err)
        });
    },

    createUser ({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    addFriends({ params }, res) {
        User.findOneAndUpdate (
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true }
        ).populate({ path: 'freinds ', select: ('-__v')})
        .select('-__v')
        .then(dbUserDat => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.status(400).json(err))
    },

    deleteFriends({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.id }, 
        { $pull: { friends: params.friendId }},
        { new: true }
        ).populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },
};

module.exports = userController;
