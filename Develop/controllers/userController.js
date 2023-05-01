const { User } = require('../models');

module.exports = {
  // Get all students
  getUsers(req, res) {
    User.find()
      .then(async (user) => {
        const userObj = {
          user,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ id: req.params.userId })
      .select('-__v')
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ id: req.params.userId},
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
updateUser(req, res) {
  // Uses findOneAndUpdate() method on model
  User.findOneAndUpdate(
    // Finds first document with name of "Kids"
    { id: req.params.userId },
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
  addNewFriend(req, res) {
    User.findOneAndUpdate(
      // Finds first document with name of "Kids"
      { id: req.params.userId },
      // Replaces name with value in URL param
      
      { $addToSet: { friends: req.params.friendId} },
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

  deleteFriendById(req, res) {
    User.findOneAndUpdate(
      // Finds first document with name of "Kids"
      { id: req.params.userId },
      // Replaces name with value in URL param
      
      { $pull: { friends: req.params.friendId} },
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


};