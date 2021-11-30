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
        addThought({params, body}, res) {
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
        // update thought with id
        updateThought ({params, body }, res) {
            Thought.findOneAndUpdate (
            { _id: params.thoughtId},
            body,
            {new: true, runValidators: true}    
            )
            .then(dbThoughtsData => {
                if(!dbThoughtsData){
                    res.status(404).json({message: 'No thought located with provided Id!'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
        },
        // delete thought
        deleteThought({params}, res) {
            Thought.findOneAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({message: 'No thought located with provided Id!'});
            }    
            return User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {thoughts: params.thoughtId}},
            {new: true}
            );
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({message: 'No thought located with provided Id!'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(404).json(err))
        },

        // adding reaction
        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $addToSet: { reactions: body } },
              { new: true, addValidators: true }
            )
            .then








}