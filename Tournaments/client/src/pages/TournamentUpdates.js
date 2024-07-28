import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const TournamentUpdates = () => {
  const [tournament, setTournament] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    time: "",
    city: "",
    country: "",
    province: "",
    street: "",
    buildingAddress: "",
    referee: "",
  });

  const getTournamentUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/tournament/get-tournament/${id}`);
      if (data?.success) {
        setTournament(data?.tournament);
        setInputs({
          title: data?.tournament.title,
          description: data?.tournament.description,
          image: data?.tournament.image,
          time: data?.tournament.time,
          city: data?.tournament.city,
          country: data?.tournament.country,
          province: data?.tournament.province,
          street: data?.tournament.street,
          buildingAddress: data?.tournament.buildingAddress,
          referee: data?.tournament.referee,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTournamentUpdate();
  }, [id]);

  const [imag, setImag] = useState();
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImag(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const [referees, setReferees] = useState([]);
  const getAllReferee = async () => {
    try {
      const { data } = await axios.get(`/api/v1/referee/all-referee`);
      setReferees(data?.referees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReferee();
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const extractHourFromDateTimeLocal = (dateTimeLocalValue) => {
    const dateObj = new Date(dateTimeLocalValue);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/tournament/update-tournament/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: imag,
        time: inputs.time,
        city: inputs.city,
        country: inputs.country,
        province: inputs.province,
        street: inputs.street,
        buildingAddress: inputs.buildingAddress,
        referee: inputs.referee,
      });
      if (data?.success) {
        toast.success("Turniej zaktualizowany");
        navigate("/my-tournaments");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nie można dać takiego samego tytułu");
    }
  };
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = (now.getDate() + 1).toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  const handleBack = () => {
    navigate(`/tournament-details/${id}`);
  };
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <>
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
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
            sx={{ textTransform: "uppercase" }}
          >
            Zaktualizuj turniej
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Tytuł
              </InputLabel>
              <TextField
                label="Tytuł"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                style={{
                  width: "100%",
                  textAlign: "center",


                  outline: 'none'
                }}
              />

              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Opis wydarzenia
              </InputLabel>
              <textarea
                label="Dodaj opis"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                style={{
                  padding: '10px 15px',
                  color: '#333',
                  border: '1px solid #ccc',
                  borderRadius: '5px',

                  width: "100%",
                  height: "200px",
                  resize: "none",
                  outline: 'none',
                  overflowY: 'auto',
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
                onChange={convertToBase64}
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
                  src={inputs.image}
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
          </Grid>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
            Wybierz sędziego ( Imie, Nazwisko, Doświadczenie, Wiek) - opcjonalnie
          </InputLabel>
          <Select
            name="referee"
            value={inputs.referee}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            style={{
              width: "80%",
              textAlign: "center",
              outline: 'none'
            }}
          >
            <MenuItem value={null}>Brak sędziego</MenuItem>
            <MenuItem value={inputs?.referee}>{inputs?.referee?.firstName} {inputs?.referee?.lastName} {inputs?.referee?.experienceYears} {inputs?.referee?.judgeAge}</MenuItem>
            {referees.map((referee) => (
              <MenuItem key={referee._id} value={referee._id}>
                {referee.verification ? (
                  <>
                    ✔ {referee.firstName} {referee.lastName} {referee.uefaId} {referee.experienceYears} {referee.judgeAge}
                  </>
                ) : (
                  <>
                    {referee.firstName} {referee.lastName} {referee.uefaId} {referee.experienceYears} {referee.judgeAge}
                  </>
                )}
              </MenuItem>
            ))}
          </Select>
          <Grid container item xs={12} style={{ marginBottom: "20px" }}></Grid>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Kraj
              </InputLabel>
              <TextField
                label="Kraj"
                name="country"
                value={inputs.country}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  textAlign: "center",
                  outline: 'none'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Województwo
              </InputLabel>
              <TextField
                label="Województwo"
                name="province"
                value={inputs.province}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  textAlign: "center",
                  outline: 'none'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Miejscowość
              </InputLabel>
              <TextField
                label="Miejscowość"
                name="city"
                value={inputs.city}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  textAlign: "center",
                  outline: 'none'
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Ulica
              </InputLabel>
              <TextField
                label="Ulica"
                name="street"
                value={inputs.street}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                style={{
                  width: "100%",
                  textAlign: "center",
                  outline: 'none'
                }}
              /></Grid>
            <Grid item xs={6}>
              <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
                Adres budynku
              </InputLabel>
              <TextField
                label="Adres budynku"
                name="buildingAddress"
                value={inputs.buildingAddress}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                style={{
                  width: "100%",
                  textAlign: "center",
                  outline: 'none'
                }}
              />
            </Grid>
          </Grid>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
            wstaw datę wydarzenia
          </InputLabel>
          <input
            type="datetime-local"
            name="time"
            required
            onChange={handleChange}
            value={extractHourFromDateTimeLocal(inputs.time)}
            min={getCurrentDateTime()}
            style={{

              width: '80%',
              height: '50px',
              textAlign: 'center',
              marginBottom: '20px',

              outline: 'none'
            }}
          />

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
    </>
  );
};

export default TournamentUpdates;
