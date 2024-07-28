import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Grid } from "@mui/material";

const CreateTournament = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    city: "",
    country: "",
    province: "",
    street: "",
    buildingAddress: "",
    referee: "",
    time: "",
  });
  const [referees, allReferees] = useState([]);
  const getAllReferee = async () => {
    const { data } = await axios.get(`/api/v1/referee/all-referee`);
    allReferees(data?.referees);
  }
  useEffect(() => {
    getAllReferee();
  }, []);

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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!imag || !imag.trim()) {
        toast.error("Wybierz zdjęcie dla turnieju!");
        return;
      }

      const { data } = await axios.post("/api/v1/tournament/create-tournament", {
        title: inputs.title,
        description: inputs.description,
        image: imag,
        user: id,
        city: inputs.city,
        country: inputs.country,
        province: inputs.province,
        street: inputs.street,
        buildingAddress: inputs.buildingAddress,
        referee: inputs.referee,
        time: inputs.time,
      });
      if (data?.success) {
        toast.success("Turniej został utworzony");
        navigate("/my-tournaments");
      }
    } catch (error) {
      console.error(error);
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
            Stwórz turniej
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
            <MenuItem value="" >Wybierz sędziego</MenuItem>

            {referees.map((referee) => (
              <MenuItem key={referee._id} value={referee._id}>
                {referee.verification ? (
                  <>
                    ✔ {referee.firstName} {referee.lastName} {referee.experienceYears} {referee.judgeAge}
                  </>
                ) : (
                  <>
                    {referee.firstName} {referee.lastName} {referee.experienceYears} {referee.judgeAge}
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
            min={getCurrentDateTime()}
            style={{

              width: '80%',
              height: '50px',
              textAlign: 'center',
              marginBottom: '20px',

              outline: 'none'
            }}
          />
          <Button type="submit" color="primary" variant="contained">
            Stwórz turniej
          </Button>
        </Box>

      </form>
    </>
  );
};

export default CreateTournament;