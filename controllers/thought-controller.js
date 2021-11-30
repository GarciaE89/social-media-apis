const { Usser, Thought, User } = require('../models');

const thoughtControllers = {
        // use get for all thoughts
        getAllThoughts(req, res) {
            Thought.find({})
                .populate({
                    path: 'user',
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
        //  get a single thought by id 
        getSingleThought({ params }, res) {
            Thought.findOne({ _id: params.thoughtId })
                .select('-__v')
                .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json ({message: 'No thought located with Id provided!'});
                    return;
                }
                res.json(dbThoughtsData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
    
                });

        },

        // add thought to specific user
        addthought({params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
        return User.FindOneAndUpdate (
          {_id: params.userId},
          {$addToSet : {thoughts: _id}},
          {new: true}  
        );    
        })
        .then(dbThoughtsData => {
         if(!dbThoughtsData){
             res.status(404).json({message: 'No user located with provided Id!'});
             return;
         }    
         res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
        },

        






}