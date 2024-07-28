import React, { useState, useEffect } from "react";
import axios from "axios";
import TournamentCard from "../components/TournamentCard";

const UserTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const getUserTournaments = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/tournament/user-tournament/${id}`);
      if (data?.success) {
        setTournaments(data?.userTournament.tournaments);
        setName(data?.userTournament?.username);
        setSurname(data?.userTournament?.surname);
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
    getUserTournaments();
  }, []);
  const containerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  };

  const h2Style = {
    textAlign: 'center',
  };
  return (
    <div>
      {tournaments && tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <TournamentCard
            key={tournament._id}
            id={tournament._id}
            isUser={true}
            title={tournament.title}
            description={tournament.description}
            image={tournament.image}
            username={name}
            surname={surname}
            time={tournament.createdAt}
            time1={extractHourFromDateTimeLocal(tournament?.time)}
          />

        ))
      ) : (
        <div style={containerStyle}>
          <h1 >Nie stworzyłeś jeszcze żadnych turniejów.</h1>

        </div>

      )}
    </div>
  );
};

export default UserTournaments;