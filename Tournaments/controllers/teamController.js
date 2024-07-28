const Team = require("../models/teamModel");
const bcrypt = require("bcrypt");

exports.createTeam = async (req, res) => {
  try {
    const {
      teamName,
      logo,
      players,
      captainIndex,
      rodoAgreement,
      user,
      tournament,
      result1,
      result2,
      result3,
    } = req.body;

    const existingTeam = await Team.findOne({ teamName, tournament });
    if (existingTeam) {
      return res.status(400).json({ success: false, message: 'A team with the same name already exists in this tournament' });
    }

    const newTeam = new Team({
      teamName,
      logo,
      players,
      captainIndex,
      rodoAgreement,
      user,
      tournament,
      result1,
      result2,
      result3,
    });

    await newTeam.save();

    res.json({ success: true, message: 'Team created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating the team', error: error.message });
  }
};

exports.tournamentTeamController = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await Team.find({ tournament: tournamentId });

    if (!teams || teams.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No teams found for the specified tournament",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teams for the specified tournament",
      teams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving teams",
      error: error.message,
    });
  }
};





exports.updateTeamController = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, tournament, result1, result2, result3, ...otherProps } = req.body;

    const existingTeam = await Team.findOne({ teamName, tournament, _id: { $ne: id } });
    if (existingTeam) {
      return res.status(400).json({ success: false, message: 'A team with the same name already exists in this tournament' });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { teamName, tournament, result1, result2, result3, ...otherProps },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: 'Team Updated!',
      team: updatedTeam,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error while updating team',
      error,
    });
  }
};



exports.updateAllTeamController = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName,
      logo,
      players,
      captainIndex,
      rodoAgreement,
      user,
      tournament,
      result1,
      result2,
      result3, } = req.body;

    const team = await Team.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Tournament Updated!",
      team,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating tournament",
      error,
    });
  }
};

exports.deleteTeamController = async (req, res) => {
  try {
    const team = await Team
      .findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success: true,
      message: "Team Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing Team",
      error,
    });
  }
};

exports.getTeamByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).send({
        success: false,
        message: "tournament not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single tournament",
      team,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single tournament",
      error,
    });
  }
};


exports.AllTeam = async (req, res) => {
  try {
    const teams = await Team.find({}).populate("tournament");
    return res.status(200).send({
      userCount: teams.length,
      success: true,
      message: "all teams data",
      teams,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl teams",
      error,
    });
  }
};