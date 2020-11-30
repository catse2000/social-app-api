const router = require('express').Router();

// import CRUD methods
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)

// /api/thoughts/<userId>
router
    .route('/:userId/')
    .post(createThought);

// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')


router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .put(addReaction)
    .delete(deleteThought)

// /api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;