import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Referee = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    uefaId: "",
    country: "",
    province: "",
    city: "",
    phoneNumber: "",
    experienceYears: "",
    judgeAge: "",
    rodoAccepted: false,
    verification: false,
  });
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/referee/Referee", {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        uefaId: inputs.uefaId,
        country: inputs.country,
        province: inputs.province,
        city: inputs.city,
        phoneNumber: inputs.phoneNumber,
        experienceYears: inputs.experienceYears,
        judgeAge: inputs.judgeAge,
        rodoAccepted: inputs.rodoAccepted,
        user: id,
        verification: inputs.verification,
      });
      if (data.success) {
        toast.success("Dodano nowego sędziego");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{6,11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handlePhoneNumberValidation = () => {
    if (!isPhoneNumberValid(inputs.phoneNumber)) {
      setPhoneNumberError('Numer telefonu musi zawierać od 6 do 11 cyfr.');
    } else {
      setPhoneNumberError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
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
          Formularz dla sędziów
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}  >
            <TextField
              label="Imię"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              required
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>
          <Grid item xs={12} sm={4} >
            <TextField
              label="Nazwisko"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              required
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>
          <Grid item xs={12} sm={8} justifyContent="center">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>
          <Grid item xs={12} sm={8} justifyContent="center">
            <TextField
              label="Identyfikator UEFA"
              name="uefaId"
              value={inputs.uefaId}
              onChange={handleChange}
              required
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>
          <Grid container item xs={12} style={{ marginBottom: "20px" }}></Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Kraj"
                  name="country"
                  value={inputs.country}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Województwo"
                  name="province"
                  value={inputs.province}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Miejscowość"
                  name="city"
                  value={inputs.city}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} justifyContent="center">
            <TextField
              label="Numer telefonu"
              name="phoneNumber"
              value={inputs.phoneNumber}
              onChange={handleChange}
              required
              onBlur={handlePhoneNumberValidation}
              error={Boolean(phoneNumberError)}
              helperText={phoneNumberError}
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Lata doświadczenia"
                  type="number"
                  name="experienceYears"
                  value={inputs.experienceYears}
                  onChange={handleChange}
                  required
                  error={isNaN(Number(inputs.experienceYears)) || Number(inputs.experienceYears) <= 0}
                  helperText={
                    isNaN(Number(inputs.experienceYears)) || Number(inputs.experienceYears) <= 0
                      ? "Lata doświadczenia muszą być liczbami dodatnimi."
                      : ""
                  }
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Wiek sędziego"
                  type="number"
                  name="judgeAge"
                  value={inputs.judgeAge}
                  onChange={handleChange}
                  required
                  error={Number(inputs.judgeAge) < 18}
                  helperText={
                    Number(inputs.judgeAge) < 18
                      ? "Wiek sędziego nie może być mniejszy niż 18 lat."
                      : ""
                  }
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rodoAccepted"
                  checked={inputs.rodoAccepted}
                  onChange={handleChange}
                  required
                />
              }
              label="Akceptuję RODO"
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" variant="contained" style={{ borderRadius: 3, marginTop: 3 }}>
          Wyślij
        </Button>
      </Box>
    </form>
  );


};

export default Referee;
