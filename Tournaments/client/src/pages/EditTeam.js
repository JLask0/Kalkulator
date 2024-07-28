import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

const TournamentUpdates = () => {
  const [tournament, setTournament] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const idtournament = localStorage.getItem("tournamentId");
  const [inputs, setInputs] = useState({
    teamName: '',
    logo: '',
    players: Array.from({ length: 10 }, () => ({
      firstName: '',
      lastName: '',
      shirtNumber: '',
      nickname: '',
      captainPhone: '',
      captainEmail: ''
    })),
    captainIndex: 0,
    result1: '',
    result2: '',
    result3: ''
  });
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [imag, setImag] = useState();

  const getTeamUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/team/get-team/${id}`);
      if (data?.success) {
        setTournament(data?.team);
        setInputs(prevInputs => ({
          teamName: data?.team?.teamName || '',
          logo: data?.team?.logo || '',
          players: data?.team?.players || prevInputs.players,
          captainIndex: data?.team?.captainIndex || 0,
          tournament: data?.team?.tournament,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeamUpdate();
  }, [id]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes("players")) {
      const newPlayers = [...inputs.players];
      const playerIndex = parseInt(name.split("-")[1]);
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        [name.split("-")[2]]: value
      };
      setInputs(prevInputs => ({ ...prevInputs, players: newPlayers }));
    } else {
      setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/team/update-team/${id}`, {
        teamName: inputs.teamName,
        logo: imag,
        players: inputs.players,
        captainIndex: inputs.captainIndex,
        result1: inputs.result1,
        result2: inputs.result2,
        result3: inputs.result3,
        tournament: inputs.tournament,
      });
      if (data?.success) {
        toast.success("Dane zaktualizowane");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nie można dać takiego samego tytułu");
    }
  };

  const covertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImag(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  };


  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleBack = () => {
    navigate(`/tournament-details/${idtournament}`);
  };

  const handleTeamClick = () => {
    navigate(`/showTeam/${id}`);
  };


  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{6,11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handlePhoneNumberValidation = () => {
    if (!isPhoneNumberValid(inputs.players[inputs.captainIndex].captainPhone)) {
      setPhoneNumberError('Numer telefonu musi zawierać od 6 do 11 cyfr.');
    } else {
      setPhoneNumberError('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth="80%"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        marginBottom={5}
        boxShadow="10px 20px 30px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          textAlign={'center'}
          fontWeight="bold"
          padding={3}
          color="gray"
        >
          Edycja Drużyny
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
              Nazwa drużyny
            </InputLabel>
            <TextField
              label="Nazwa drużyny"
              name="teamName"
              value={inputs.teamName}
              onChange={(e) => handleChange(e)}
              required
              style={{
                width: "100%",
                textAlign: "center",
                outline: 'none'
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
              Logo turnieju
            </InputLabel>
            <input
              id="fileInput"
              accept="image/*"
              type="file"
              onChange={covertToBase64}
              style={{ display: 'none' }}
            />
            {imag ? (
              <img
                src={imag}
                alt="Miniaturka logo drużyny"
                style={{
                  width: '350px',
                  height: '350px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '10px',
                  borderRadius: '3%',
                }}
              />
            ) : (
              <img
                src={inputs.logo}
                alt="Miniaturka logo drużyny"
                onClick={handleImageClick}
                style={{
                  width: '350px',
                  height: '350px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '10px',
                  borderRadius: '3%',
                }}
              />
            )}
          </Grid>
          <Grid container spacing={2}><Grid item xs={12}>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center", margin: "15px" }}>
              Członkowie drużyny
            </InputLabel>
          </Grid></Grid>
          {inputs.players.map((player, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Imię zawodnika ${index + 1}`}
                  name={`players-${index}-firstName`}
                  value={player.firstName}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Nazwisko zawodnika ${index + 1}`}
                  name={`players-${index}-lastName`}
                  value={player.lastName}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Numer na koszulce ${index + 1}`}
                  name={`players-${index}-shirtNumber`}
                  value={player.shirtNumber}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Ksywka zawodnika ${index + 1}`}
                  name={`players-${index}-nickname`}
                  value={player.nickname}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", margin: "15px" }}>
              Kapitan
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl>
              <InputLabel>Kapitan</InputLabel>
              <Select
                name="captainIndex"
                value={inputs.captainIndex}
                onChange={(e) => handleChange(e)}
                required
              >
                <MenuItem value={null}>Wybierz kapitana</MenuItem>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                  <MenuItem key={index} value={index}>
                    Zawodnik {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={9}>
            {inputs.captainIndex !== null && (
              <div>
                <TextField
                  label="Telefon kapitana"
                  name={`players-${inputs.captainIndex}-captainPhone`}
                  value={inputs.players[inputs.captainIndex].captainPhone}
                  onChange={(e) => handleChange(e)}
                  required
                  onBlur={handlePhoneNumberValidation}
                  error={Boolean(phoneNumberError)}
                  helperText={phoneNumberError}
                />
                <TextField
                  label="Email kapitana"
                  type={"email"}
                  name={`players-${inputs.captainIndex}-captainEmail`}
                  value={inputs.players[inputs.captainIndex].captainEmail}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={5}>
            <Button
              variant="contained"
              onClick={handleBack}
              style={{
                backgroundColor: "#555",
                color: "#fff",
                marginTop: "20px"
              }}>
              Powrót
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button
              type="submit"
              color="warning"
              variant="contained"
              style={{ marginTop: '20px' }}
            >
              Aktualizuj
            </Button>
          </Grid>
        </Grid>

      </Box>
    </form>
  );
};

export default TournamentUpdates;
