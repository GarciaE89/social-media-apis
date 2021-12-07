const {User} = require('../models');

// fuctions will be in methods of the user 
const userController = {
    // all users

        allUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Single user with subdocument data
    getUserbyId({params}, res){
        User.findOne({_id: params._id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user located with provided Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user located with provided id!'});
                return;
            }    
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    

    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user located with provided id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.friendsId},
            {$addToSet: {friends: params.friendsId}},
            {new: true}

        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user located with provided id!'});
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendsId } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user located with provided id!' });
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json(err);
          });
      }

}

module.exports = userController;