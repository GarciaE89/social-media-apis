const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// api route for all thoughts
router
.route('/')
.get(getAllThoughts);

// api post thought to user id
router
.route('/:userId')
.post(addThought);

// delete thought from user by id
// router
// .route('/:thoughtId/:userId')


// get single thought 
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// reactions route
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;



