const mongoose = require("mongoose");
const tournamentModel = require("../models/tournamentModel");
const userModel = require("../models/userModel");

exports.getAllTournamentsController = async (req, res) => {
  try {
    const tournaments = await tournamentModel.find({}).populate("user");
    if (!tournaments) {
      return res.status(200).send({
        success: false,
        message: "No Tournaments Found",
      });
    }
    return res.status(200).send({
      success: true,
      TournamentCount: tournaments.length,
      message: "All Tournaments lists",
      tournaments,
    });
  } catch (error) {
    console.log(error);
    console.log("---", req.cookie);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Tournaments",
      error,
    });
  }
};

exports.createTournamentController = async (req, res) => {
  try {
    const { title, description, image, user, city, buildingAddress, street, province, country, referee, time } = req.body;
    if (!title || !description || !image || !user || !city || !buildingAddress || !street || !province || !country || !time) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const existingTournament = await tournamentModel.findOne({ title });
    if (existingTournament) {
      return res.status(400).send({
        success: false,
        message: "Tournament with this title already exists",
      });
    }
    const exisitingUser = await userModel.findById(user);
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    if (!referee) {
      const newTournament = new tournamentModel({ title, description, image, user, city, buildingAddress, street, province, country, time, });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newTournament.save({ session });
      exisitingUser.tournaments.push(newTournament);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newTournament.save();
      return res.status(201).send({
        success: true,
        message: "Tournament Created!",
        newTournament,
      });
    } else {
      const newTournament = new tournamentModel({ title, description, image, user, city, buildingAddress, street, province, country, referee, time });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newTournament.save({ session });
      exisitingUser.tournaments.push(newTournament);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newTournament.save();
      return res.status(201).send({
        success: true,
        message: "Tournament Created!",
        newTournament,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting tournament",
      error,
    });
  }
};

exports.updateTournamentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, city, buildingAddress, country, street, province, referee, time } = req.body;

    const existingTournament = await tournamentModel.findOne({ title, _id: { $ne: id } });
    if (existingTournament) {
      return res.status(400).send({
        success: false,
        message: "Tournament with this title already exists",
      });
    }
    const tournament = await tournamentModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Tournament Updated!",
      tournament,
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
exports.getTournamentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await tournamentModel.findById(id).populate("user").populate("referee").populate("comments.user");
    if (!tournament) {
      return res.status(404).send({
        success: false,
        message: "tournament not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single tournament",
      tournament,
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

exports.getRefName = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await tournamentModel.findById(id).populate("referee");
    if (!tournament) {
      return res.status(404).send({
        success: false,
        message: "tournament not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single tournament",
      tournament,
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

exports.deleteTournamentController = async (req, res) => {
  try {
    const tournament = await tournamentModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await tournament.user.tournaments.pull(tournament);
    await tournament.user.save();
    return res.status(200).send({
      success: true,
      message: "Tournament Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing Tournament",
      error,
    });
  }
};

exports.userTournamentControlller = async (req, res) => {
  try {
    const userTournament = await userModel.findById(req.params.id).populate("tournaments");

    if (!userTournament) {
      return res.status(404).send({
        success: false,
        message: "tournaments not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user tournaments",
      userTournament,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user tournament",
      error,
    });
  }
};

exports.addComment = async (req, res) => {
  const { comment, uId } = req.body;
  try {
    const updatedTournament = await tournamentModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            text: comment,
            user: uId,
          },
        },
      },
      { new: true }
    );
    console.log(req.body);

    res.status(200).json({
      success: true,
      comment: updatedTournament.comments.pop(),
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error while adding comment',
      error,
    });
  }
};


