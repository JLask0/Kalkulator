
const refereeModel = require("../models/refereeModel");
const bcrypt = require("bcrypt");
exports.registerRefereeController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      uefaId,
      country,
      province,
      city,
      phoneNumber,
      experienceYears,
      judgeAge,
      user,
      verification,
    } = req.body;

    const newReferee = new refereeModel({
      firstName,
      lastName,
      email,
      uefaId,
      country,
      province,
      city,
      phoneNumber,
      experienceYears,
      judgeAge,
      user,
      verification,
    });

    await newReferee.save();

    return res.status(201).send({
      success: true,
      message: "New Referee Created",
      newReferee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

exports.getAllReferee = async (req, res) => {
  try {
    const referees = await refereeModel.find({});

    return res.status(200).send({
      refereeCount: referees.length,
      success: true,
      message: "All referee data",
      referees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Referees",
      error,
    });
  }
};

exports.updateRefereeVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus } = req.body;

    const referee = await refereeModel.findById(id);
    if (!referee) {
      return res.status(404).send({
        success: false,
        message: 'Referee not found with this id',
      });
    }

    referee.verification = verificationStatus;
    await referee.save();
    return res.status(200).send({
      success: true,
      message: 'Referee verification status updated successfully',
      referee,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error while updating referee verification status',
      error,
    });
  }
};

exports.deleteReferee = async (req, res) => {
  try {
    const user = await refereeModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "User Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing User",
      error,
    });
  }
}