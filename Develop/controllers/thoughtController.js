const { Thought } = require('../models');
var ObjectId = require('mongodb').ObjectID;
module.exports = {
  // Get all students
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    console.log(req.params.thoughtId),
    Thought.findOne({_id:req.params.thoughtId})
      .select('-__v')
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with that ID' }) 
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new student
  createThought(req, res) {
    Thought.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ id: req.params.thoughtId},
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Deleted: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ error: 'Something went wrong' });
        }
      }
    );
  },

// Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
updateThought(req, res) {
  // Uses findOneAndUpdate() method on model
  Thought.findOneAndUpdate(
    // Finds first document with name of "Kids"
    { id: req.params.studentId },
    // Replaces name with value in URL param
    { $set: req.body },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    }
  );
  },

  addNewReaction(req, res) {
    Thought.findOneAndUpdate(
      // Finds first document with name of "Kids"
      { id: req.params.thoughtId },
      // Replaces name with value in URL param
      
      { $addToSet: { reactions: req.body} },
      // Sets to true so updated document is returned; Otherwise original document will be returned
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      // Finds first document with name of "Kids"
      { _id: req.params.thoughtId },
      // Replaces name with value in URL param
      
      { $pull: { reactions: { reactionId :req.params.reactionId} }},
      // Sets to true so updated document is returned; Otherwise original document will be returned
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  }
};

//delete one reaction by id
