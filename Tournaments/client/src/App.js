import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserTournaments from "./pages/UserTournaments";
import CreateTournament from "./pages/CreateTournament";
import TournamentUpdates from "./pages/TournamentUpdates";
import TournamentDetails from "./pages/TournamentDetails";
import Referee from "./pages/Referee";
import AddTeam from "./pages/AddTeam";
import About from "./pages/About";
import Home from "./pages/Home";
import StartTournament from "./pages/StartTournament";
import UserEdit from "./pages/UserEdit";
import ShowTeam from "./pages/ShowTeam";
import EditTeam from "./pages/EditTeam";
import UserPassword from "./pages/UserPassword";
import NotFound from './pages/NotFound';
import AdminDashboard from './admin/AdminDashboard';
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import './css/Footer.css';

function App() {
  const userToken = localStorage.getItem("token");
  const uId = localStorage.getItem("userId");
  const id = useParams().id;
  const [user, setUser] = useState("");
  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${uId}`);
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);


  return (
    <>
      <div className="app-container">
        <Header />
        <Toaster />
        {((userToken && user.verification === true) || user.role === "admin") ? (
          <>
            <Routes>
              <Route path="/" element={<Tournaments />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/my-tournaments" element={<UserTournaments />} />
              <Route path="/tournament-updates/:id" element={<TournamentUpdates />} />
              <Route path="/tournament-details/:id" element={<TournamentDetails />} />
              <Route path="/user-update/:id" element={<UserEdit />} />
              <Route path="/user-password/:id" element={<UserPassword />} />
              <Route path="/showTeam/:id" element={<ShowTeam />} />
              <Route path="/EditTeam/:id" element={<EditTeam />} />
              <Route path="/create-tournament" element={<CreateTournament />} />
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/startTournament" element={<StartTournament />} />
              <Route path="/referee" element={<Referee />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/admin/dashboard' element={<AdminDashboard />} />

            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Tournaments />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/my-tournaments" element={<UserTournaments />} />
              <Route path="/tournament-details/:id" element={<TournamentDetails />} />
              <Route path="/user-update/:id" element={<UserEdit />} />
              <Route path="/user-password/:id" element={<UserPassword />} />
              <Route path="/showTeam/:id" element={<ShowTeam />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
