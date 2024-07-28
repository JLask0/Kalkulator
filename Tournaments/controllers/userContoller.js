const userModel = require("../models/userModel");
const tournamentModel = require('../models/tournamentModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerController = async (req, res) => {
  try {
    const { username, email, password, surname, role, verification } = req.body;
    if (!username || !email || !password || !surname) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "Podany email już isnieje",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedPassword, surname, role, verification });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: "7d",
    });

    res.cookie("auth-token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",

      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  const options = { maxAge: 60 * 60 * 24 * 1000, httpOnly: true }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res
    .status(codeStatus)
    .cookie('token', token, options)
    .json({
      success: true,
      user: user,
      token: token,
    })
}
exports.updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, surname } = req.body;
    const user = await userModel.findById(id);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid password. No authorization to change data",
      });
    }
    let updateFields = {};

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (surname) updateFields.surname = surname;
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating data",
      error,
    });
  }
};

exports.updatePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { password: newPassword, oldPassword } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: "Password Updated!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating password",
      error,
    });
  }
};


exports.getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "tournament not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single tournament",
      user,
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

exports.updateUserVerificationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found with this id',
      });
    }

    user.verification = verificationStatus;
    await user.save();

    return res.status(200).send({
      success: true,
      message: 'User verification status updated successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error while updating user verification status',
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    console.log('User:', user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const tournaments = await tournamentModel.find({ user: req.params.id });

    for (const tournament of tournaments) {
      await tournament.remove();
    }

    return res.status(200).send({
      success: true,
      message: "User and associated tournaments deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting user and associated tournaments",
      error: error.message,
    });
  }
};