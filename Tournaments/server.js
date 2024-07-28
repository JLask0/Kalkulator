const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const tokenVerification = require('./middleware/tokenVerification')
const { isAuthenticated, isAdmin } = require('./middleware/auth');

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const refereeRoutes = require("./routes/refereeRoutes");
const teamRoutes = require("./routes/teamRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/v1/user", isAuthenticated);
app.get("/api/v1/tournament", isAuthenticated);
app.get("/api/v1/referee", tokenVerification);
app.get("/api/v1/team", tokenVerification);

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tournament", isAuthenticated, tournamentRoutes);
app.use("/api/v1/referee", isAuthenticated, refereeRoutes);
app.use("/api/v1/team", isAuthenticated, teamRoutes);
app.use("/api/v1/rating", isAuthenticated, ratingRoutes);

// Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});