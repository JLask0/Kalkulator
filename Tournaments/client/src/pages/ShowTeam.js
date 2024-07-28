import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, Button, TableCell, TableRow, TableHead, TableContainer, Table, TableBody, Grid } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from '@mui/icons-material/Delete';
const TournamentUpdates = () => {
  const [tournament, setTournament] = useState({});
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    teamName: '',
    logo: '',
    players: [
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
      { firstName: '', lastName: '', shirtNumber: '', nickname: '', captainPhone: '', captainEmail: '' },
    ],
    captainIndex: 0,
    result1: '',
    result2: '',
    result3: '',
    userTeam: '',
  });
  const id = useParams().id;
  const getTeamUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/team/get-team/${id}`);
      if (data?.success) {
        setTournament(data?.team);
        setInputs({
          teamName: data?.team?.teamName || '',
          logo: data?.team?.logo || '',
          players: data?.team?.players || inputs.players,
          captainIndex: data?.team?.captainIndex || 0,
          result1: data?.team?.result1 || '',
          result2: data?.team?.result2 || '',
          result3: data?.team?.result3 || '',
          userTeam: data?.team?.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    navigate(`/EditTeam/${id}`);
  };
  const idtournament = localStorage.getItem("tournamentId");
  const handleBack = () => {
    navigate(`/tournament-details/${idtournament}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/team/delete-team/${id}`);
      if (data?.success) {
        alert("Team usunięty");
        Navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [user, setUser] = useState("");
  const uId = localStorage.getItem("userId");
  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${uId}`);
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTeamUpdate();
    getUser();
  }, [id]);

  return (
    <Box sx={{ background: '#ccc', fontFamily: "Google Sans,arial,sans-serif" }}>
      <Card
        sx={{
          width: "80%",
          margin: "auto",
          mt: 2,
          padding: 2,
          marginTop: 5,
          marginBottom: 5,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
          backgroundColor: "#f2f2f2",
          color: "#333",
          borderRadius: '10px',
        }}
      >
        {(localStorage.getItem("userId") === tournament?.user || localStorage.getItem("userId") === inputs.userTeam || user.role === "admin") && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                <ModeEditIcon color="info" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          </>
        )}

        <Box display="flex" alignItems="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h5" color="text.secondary" style={{ marginTop: '100px', fontFamily: "Google Sans,arial,sans-serif" }}>
                  Zespół <strong>{inputs.teamName}</strong>
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <CardMedia
                component="img"
                height="350"
                width="350"
                image={inputs.logo}
                alt="Logo Drużyny"
                style={{
                  width: '350px',
                  height: '350px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '30px',
                  marginBottom: '10px',
                  borderRadius: '3%',
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <CardContent>
          <Typography variant="h5" color="text.secondary" style={{ fontFamily: "Google Sans,arial,sans-serif" }}>
            Kapitan drużyny: <strong>{inputs.players[inputs.captainIndex]?.firstName} {inputs.players[inputs.captainIndex]?.lastName}</strong>
          </Typography>
          <Typography variant="h6" color="text.secondary" style={{ fontFamily: "Google Sans,arial,sans-serif" }}>
            Zawodnicy
          </Typography>
          <TableContainer>
            <Table style={{ backgroundColor: '#f2f2f2', fontFamily: "Google Sans,arial,sans-serif" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif", borderRadius: '10px 0 0 10px' }}>Imię</TableCell>
                  <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif" }}>Pseudonim</TableCell>
                  <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif" }}>Nazwisko</TableCell>
                  <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif", borderRadius: '0 10px 10px 0' }}>Numer na koszulce</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inputs.players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ textAlign: 'center' }}><strong>{player.firstName}</strong></TableCell>
                    <TableCell style={{ textAlign: 'center' }}><strong>{player.nickname && `"${player.nickname}"`}</strong></TableCell>
                    <TableCell style={{ textAlign: 'center' }}><strong>{player.lastName}</strong></TableCell>
                    <TableCell style={{ textAlign: 'center' }}><strong>{player.shirtNumber}</strong></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <Button variant="contained" onClick={handleBack} style={{ backgroundColor: "#555", color: "#fff", marginTop: "10px" }}>Powrót</Button>
      </Card>
    </Box>
  );

};

export default TournamentUpdates;
