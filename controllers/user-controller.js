const {User, Thought} = require('../models');

// fuctions will be in methods of the user 
const userController = {
    // all users

        AllUsers(req, res) {
        User.find({})
        .select('__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    
}
