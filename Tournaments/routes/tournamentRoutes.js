const express = require("express");
const {
  getAllTournamentsController,
  createTournamentController,
  updateTournamentController,
  getTournamentByIdController,
  deleteTournamentController,
  userTournamentControlller,
  getRefName,
  addComment,
} = require("../controllers/tournamentControlller");
const { isVerificated } = require('../middleware/auth');

const router = express.Router();
router.get("/all-tournament", getAllTournamentsController);
router.post("/create-tournament", isVerificated, createTournamentController);
router.put("/update-tournament/:id", isVerificated, updateTournamentController);
router.get("/get-tournament/:id", getTournamentByIdController);
router.delete("/delete-tournament/:id", isVerificated, deleteTournamentController);
router.get("/user-tournament/:id", userTournamentControlller);
router.get("/get-ref/:id", getRefName);
router.put('/comment/:id', addComment);

module.exports = router;