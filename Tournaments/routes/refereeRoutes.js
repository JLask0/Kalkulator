const express = require("express");
const {
  getAllReferee,
  registerRefereeController,
  updateRefereeVerification,
  deleteReferee,
} = require("../controllers/refereeController");
const { isAdmin, isVerificated } = require('../middleware/auth');

const router = express.Router();
router.get("/all-referee", getAllReferee);
router.post("/Referee", isVerificated, registerRefereeController);
router.put('/update-verification/:id', isAdmin, updateRefereeVerification);
router.delete('/delete-referee/:id', isAdmin, deleteReferee);
module.exports = router;