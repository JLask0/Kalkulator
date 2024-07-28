

const express = require('express');
const { createTeam,
    AllTeam,
    tournamentTeamController,
    updateTeamController,
    deleteTeamController,
    updateAllTeamController,
    getTeamByIdController,
} = require('../controllers/teamController');
const {isVerificated} = require('../middleware/auth');
const router = express.Router();

router.post('/create-team',isVerificated, createTeam);
router.get('/all-teams', AllTeam);
router.get('/tournament-teams/:tournamentId', tournamentTeamController);
router.put("/update-team/:id",isVerificated, updateTeamController);
router.put("/update-Allteam/:id",isVerificated, updateAllTeamController);
router.get("/get-team/:id", getTeamByIdController);
router.delete("/delete-team/:id",isVerificated, deleteTeamController);

module.exports = router;



