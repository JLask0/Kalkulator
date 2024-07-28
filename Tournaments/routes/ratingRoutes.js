const express = require('express');
const {
    setRatingController,
    tournamentRatingController,
    updateRating,
    getUserRating,
} = require('../controllers/ratingController')

const router = express.Router();

router.post('/set-rating', setRatingController);
router.put('/update-rating/:id/:userId',updateRating);
router.get('/user-rating/:idTournament/:idUser',getUserRating);
router.get('/tournament-ratings/:id',tournamentRatingController);

module.exports = router;