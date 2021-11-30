const {Usser, Thought} = require('../models');

const thoughtControllers = {

    // use get for all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .populate({
            path: 'users',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

},
