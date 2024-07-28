import React, { useState, useEffect } from "react";
import axios from "axios";
import TournamentCard from "../components/TournamentCard";
const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const getAllTournaments = async () => {
    try {
      const { data } = await axios.get("/api/v1/tournament/all-tournament");
      if (data?.success) {
        setTournaments(data?.tournaments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const extractHourFromDateTimeLocal = (dateTimeLocalValue) => {
    const dateObj = new Date(dateTimeLocalValue);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  useEffect(() => {
    getAllTournaments();
  }, []);
  return (
    <div>
      {tournaments &&
        tournaments.map((tournament) => (
          <TournamentCard
            id={tournament?._id}
            isUser={localStorage.getItem("userId") === tournament?.user?._id}
            title={tournament?.title}
            description={tournament?.description}
            image={tournament?.image}
            username={tournament?.user?.username}
            surname={tournament?.user?.surname}
            time={tournament.createdAt}
            time1={extractHourFromDateTimeLocal(tournament?.time)}
          />
        ))}
    </div>
  );
};

export default Tournaments;
