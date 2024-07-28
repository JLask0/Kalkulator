import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TeamForm = () => {
  const id = localStorage.getItem('userId');
  const idtournament = localStorage.getItem("tournamentId");
  const navigate = useNavigate();
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [inputs, setinputs] = useState({
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
    captainIndex: null,
    rodoAgreement: false,
    result1: 0,
    result2: 0,
    result3: 0,
  });

  const [imag, setImag] = useState();

  const covertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImag(reader.result);
    };
    reader.onerror = error => {
      console.log(error);
    };
  }

  const handleChange = (event, index) => {
    const { name, value, type, checked } = event.target;
    const updatedinputs = { ...inputs };

    if (name.startsWith('players')) {
      const playerIndex = parseInt(name.split('-')[1], 10);
      updatedinputs.players[playerIndex][name.split('-')[2]] =
        type === 'checkbox' ? checked : value;
    } else {
      updatedinputs[name] = type === 'checkbox' ? checked : value;
    }

    setinputs(updatedinputs);
  };

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    try {
      if (!imag || !imag.trim()) {
        toast.error("Wybierz zdjęcie dla dtużyny!");
        return;
      }
      if (!inputs.teamName) {
        toast.error('Podaj nazwę drużyny.');
        return;
      }

      const requiredPlayerData = inputs.players.slice(0, 10);

      for (let i = 0; i < requiredPlayerData.length; i++) {
        const player = requiredPlayerData[i];
        if (!player.firstName || !player.lastName || !player.shirtNumber) {
          toast.error(`Wymagane dane zawodnika ${i + 1} nie zostały uzupełnione.`);
          return;
        }
      }

      if (inputs.captainIndex === null) {
        toast.error('Wybierz kapitana drużyny.');
        return;
      }

      const response = await axios.post('/api/v1/team/create-team', {
        teamName: inputs.teamName,
        logo: imag,
        players: inputs.players,
        captainIndex: inputs.captainIndex,
        rodoAgreement: inputs.rodoAgreement,
        user: id,
        tournament: idtournament,
        result1: inputs.result1,
        result2: inputs.result2,
        result3: inputs.result3,
      });

      if (response.data?.success) {
        toast.success('Przyjęto zgłoszenie');
        navigate(`/tournament-details/${idtournament}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Nie można dać takiego samego tytułu");
    }
  };
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
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
  const handleBack = () => {
    navigate(`/tournament-details/${idtournament}`);
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
          Stwórz drużynę
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
            {!imag && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <label
                  htmlFor="fileInput"
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Wybierz plik
                </label>
              </div>
            )}
            {imag && (
              <img
                src={imag}
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
            <Button variant="contained" onClick={handleBack} style={{ backgroundColor: "#555", color: "#fff", marginTop: "20px" }}>Powrót</Button>
          </Grid>
          <Grid item xs={7}>
            <Button

              type="submit"
              color="primary"
              variant="contained"
              style={{

                marginTop: '20px'
              }}
            >
              Wyślij
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default TeamForm;





