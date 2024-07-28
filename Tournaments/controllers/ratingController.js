const ratingModel = require("../models/ratingModel");


exports.setRatingController = async (req, res) => {
  try {
    const { user, ocena, tournamentId } = req.body;
    if (!user || !ocena || !tournamentId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const newRating = new ratingModel({ user, ocena, tournamentId })

    await newRating.save();
    res.json({ success: true, message: 'Rating created successfully' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating the rating', error: error.message });
  }
};

exports.tournamentRatingController = async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await ratingModel.find({ tournamentId: id });

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for the specified tournament",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ratings for the specified tournament",
      ratings,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving ratings",
      error: error.message,
    });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { user, ocena, tournamentId } = req.body;

    await ratingModel.findOneAndUpdate(
      { tournamentId: id, user: userId },
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Rating Updated!",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating rating",
      error,
    });
  }
};

exports.getUserRating = async (req, res) => {
  try {
    const { idTournament, idUser } = req.params;
    const rating = await ratingModel.findOne({ tournamentId: idTournament, user: idUser });
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for the specified tournament",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ratings for the specified tournament",
      rating,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving ratings",
      error: error.message,
    });
  }

}