const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought,
  addNewReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(addNewReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;
