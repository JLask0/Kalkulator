const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  updateUserController,
  getUserByIdController,
  updatePasswordController,
  updateUserVerificationController,
  deleteUser,
} = require("../controllers/userContoller");
const { isAuthenticated, isAdmin} = require('../middleware/auth');
const router = express.Router();

router.get("/all-users",isAuthenticated, isAdmin, getAllUsers);
router.get("/get-user/:id",isAuthenticated, getUserByIdController);
router.post("/register", registerController);
router.put("/update-user/:id",isAuthenticated ,updateUserController);
router.put("/update-password/:id",isAuthenticated, updatePasswordController);
router.put('/update-verification/:id',isAuthenticated, isAdmin, updateUserVerificationController);
router.post("/login", loginController);
router.delete("/delete-user/:id",isAuthenticated, isAdmin,deleteUser);



module.exports = router;
