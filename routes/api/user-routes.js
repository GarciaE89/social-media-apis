const router = require('express').Router();

const {
allUsers,
getUserbyId,
createUser,
updateUser,
deleteUser,
addFriend,
removeFriend
} = require('../../controllers/user-controller');

// routes to get all users and post to user apis
router
.route('/')
.get(allUsers)
.post(createUser);

// get, delete and update (put) to users
router
.route('/:id')
.get(getUserbyId)
.delete(deleteUser)
.put(updateUser);

// api for friends via users, user id, friends id 
router
.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;