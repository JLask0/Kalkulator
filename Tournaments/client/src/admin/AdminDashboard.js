

import React, { useEffect, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import ModeEditIcon from "@mui/icons-material/ModeEdit";


const AdminDashboard = () => {
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [users, setUsers] = useState([]);
  const uId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [referees, allReferees] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('tournaments');
  const menuItems = [
    { label: 'Turnieje', value: 'tournaments' },
    { label: 'Zespoły', value: 'teams' },
    { label: 'Sędziowie', value: 'referees' },
    { label: 'Użytkownicy', value: 'users' },
  ];
  const [verifiedUsers, setVerifiedUsers] = useState({});
  const [verifiedRef, setVerifiedRef] = useState({});
  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${uId}`);
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  }
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

  const getAllReferee = async () => {
    const { data } = await axios.get(`/api/v1/referee/all-referee`);
    allReferees(data?.referees);
  }
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/all-users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTeams = async () => {
    try {
      const { data } = await axios.get("/api/v1/team/all-teams");
      if (data?.success) {
        setTeams(data?.teams);
      }
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getAllReferee();
    getAllTeams();
    getAllTournaments();
    getAllUsers();
    getUser();
  }, []);












  const handleDeleteTournament = async (tournamentId) => {
    try {
      const { data } = await axios.delete(`/api/v1/tournament/delete-tournament/${tournamentId}`);
      if (data?.success) {
        alert("Turniej usunięty");
        Navigate(`/`);

      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerification = async (userId) => {
    try {

      await axios.put(`/api/v1/user/update-verification/${userId}`, {
        verificationStatus: true,
      });


      setVerifiedUsers((prevVerifiedUsers) => ({
        ...prevVerifiedUsers,
        [userId]: true,
      }));


      console.log(`Status weryfikacji użytkownika o ID ${userId} został zaktualizowany.`);
    } catch (error) {
      console.error('Błąd podczas aktualizacji statusu weryfikacji użytkownika:', error);
    }
    window.location.reload();
  };
  const handleRefVerification = async (refId) => {
    try {

      await axios.put(`/api/v1/referee/update-verification/${refId}`, {
        verificationStatus: true,
      });


      setVerifiedRef((prevVerifiedRefs) => ({
        ...prevVerifiedRefs,
        [refId]: true,
      }));


      console.log(`Status weryfikacji użytkownika o ID ${refId} został zaktualizowany.`);
    } catch (error) {
      console.error('Błąd podczas aktualizacji statusu weryfikacji użytkownika:', error);
    }
    window.location.reload();
  }


  const handleDeleteTeam = async (teamId) => {
    try {
      const { data } = await axios.delete(`/api/v1/team/delete-team/${teamId}`);
      if (data?.success) {
        alert("Team usunięty");
        Navigate(`/`);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/v1/user/delete-user/${userId}`)
      if (data?.success) {
        alert("Team usunięty");
        Navigate(`/`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteReferee = async (refereeId) => {
    try {
      const { data } = await axios.delete(`/api/v1/referee/delete-referee/${refereeId}`)
      if (data?.success) {
        alert("Team usunięty");
        Navigate(`/`);

      }
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedDate = new Date(dateString).toLocaleString(undefined, options);
    return formattedDate;
  }



  return (
    <>
      {user.role === "admin" ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', background: '#ccc', minHeight: '100vh' }}>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: '2px',
              flexShrink: 0,
              zIndex: 0,
              marginTop: '64px',
              '& .MuiDrawer-paper': {
                width: 150,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                borderRight: '4px solid grey',
                borderBottom: '4px solid grey',
                background: '#333',
                color: '#fff',
              },
            }}
          >
            <List sx={{ zIndex: 0, marginTop: '100px', paddingBottom: '60px', }}>
              {menuItems.map((item) => (
                <ListItem
                  key={item.value}
                  button
                  onClick={() => setSelectedMenu(item.value)}
                  sx={{
                    backgroundColor: selectedMenu === item.value ? '#e0e0e0' : 'transparent',
                    borderBottom: selectedMenu === item.value ? '6px solid #18b0c4' : 'none',
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>


          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginLeft: '240px',
              position: 'relative',
              zIndex: 1,

            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ color: "grey", pb: 3 }}>
              Admin Dashboard
            </Typography>


            {selectedMenu === 'tournaments' && (
              <Paper sx={{ bgcolor: "white", mb: 4, p: 2 }}>
                <Typography variant="h5" sx={{ color: "black", pb: 2 }}>
                  Turnieje
                </Typography>


                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Tytuł</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Logo turnieju</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Czas rozpoczęcia</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Kraj</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Województwo</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Miasto</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Ulica</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Adres budynku</th>


                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Sworzono</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff', textAlign: 'center' }}>Zarządzaj</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournaments.map((tournament) => (
                      <tr key={tournament._id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament?.title}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          <img
                            src={tournament.image}
                            alt="Miniaturka obrazu turnieju"
                            style={{
                              width: '100px',
                              height: '100px',
                              display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              marginBottom: '10px',
                              borderRadius: '3%',
                            }}
                          />
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(tournament.time)}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament.country}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament.province}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament.city}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament.street}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{tournament.buildingAddress}</td>


                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(tournament.createdAt)}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>

                          <IconButton onClick={() => handleDeleteTournament(tournament._id)}>
                            Usuń
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </Paper>
            )}

            {selectedMenu === 'teams' && (
              <Paper sx={{ bgcolor: "white", mb: 4, p: 2 }}>
                <Typography variant="h5" sx={{ color: "black", pb: 2 }}>
                  Zespoły
                </Typography>


                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Nazwa Drużyny</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Logo drużyny</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Turniej</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Email kapitana</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Numer telefonu kapitana</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Data utworzenia</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Zarządzaj</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team._id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{team.teamName}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          <img
                            src={team.logo}
                            alt="Miniaturka logo drużyny"
                            style={{
                              width: '100px',
                              height: '100px',
                              display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              marginBottom: '10px',
                              borderRadius: '3%',
                            }}
                          />
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{team.tournament.title}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{team.players[team.captainIndex].captainEmail}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{team.players[team.captainIndex].captainPhone}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(team.createdAt)}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>

                          <IconButton onClick={() => handleDeleteTeam(team._id)}>
                            Usuń
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </Paper>
            )}

            {selectedMenu === 'referees' && (
              <Paper sx={{ bgcolor: "white", mb: 4, p: 2 }}>
                <Typography variant="h5" sx={{ color: "black", pb: 2 }}>
                  Sędziowie
                </Typography>


                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Imie</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Nazwisko</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>UEFA ID</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Lata doświadczenia</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Wiek</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Numer telefonu</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Kraj</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Województwo</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Miasto</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Stworzono</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Weryfikacja</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Zarządzaj</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referees.map((referee) => (
                      <tr key={referee._id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd', color: referee.verification ? 'green' : 'red', textAlign: 'center' }}>{referee.firstName}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.lastName}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.uefaId}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.experienceYears}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.judgeAge}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.phoneNumber}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.country}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.province}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{referee.city}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(referee.createdAt)}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          {referee.verification ? "Zweyfikowany" : "Oczekiwanie na weryfikację"}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>

                          {referee.verification !== true && (
                            <IconButton onClick={() => handleRefVerification(referee._id)}>
                              Weryfikacja
                              <ModeEditIcon />
                            </IconButton>
                          )}
                          <IconButton onClick={() => handleDeleteReferee(referee._id)}>
                            Usuń
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Paper>
            )}

            {selectedMenu === 'users' && (
              <Paper sx={{ bgcolor: 'white', p: 2 }}>
                <Typography variant="h5" sx={{ color: 'black', pb: 2 }}>
                  Użytkownicy
                </Typography>

                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Imie</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Nazwisko</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Email</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Utworzono</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Weryfikacja</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd', background: '#333', color: '#fff' }}>Zarządzaj</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd', color: user.verification ? 'green' : 'red', textAlign: 'center' }}>{user.username}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.surname}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(user.createdAt)}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.verification ? "Zweyfikowany" : "Oczekiwanie na weryfikację"}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>

                          {user.verification !== true && (
                            <IconButton onClick={() => handleVerification(user._id)}>
                              Weryfikacja
                              <ModeEditIcon />
                            </IconButton>
                          )}
                          <IconButton onClick={() => handleDeleteUser(user._id)}>
                            Usuń
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </Paper>
            )}
          </Box>
        </Box>
      ) : (
        <div style={{
          backgroundColor: '#333',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}>
          <h2 style={{ textAlign: 'center', }}>Nie masz uprawnień admina</h2>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
