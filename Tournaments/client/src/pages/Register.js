import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "user",
    verification: false,
  });
  const [passwordError, setPasswordError] = useState('');
  const [warunki, setWarunki] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
        surname: inputs.surname,
        role: inputs.role,
        verification: inputs.verification,
      });
      if (data.success) {
        toast.success("Utworzono nowego użytkownika");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.,/?^&*])[A-Za-z\d!@#.,/?$%^&*]{8,}$/;

    return passwordRegex.test(password);
  };
  const handlePasswordValidation = () => {
    if (!isPasswordValid(inputs.password)) {
      setPasswordError(
        <div>
          Hasło musi zawierać:
          <ul style={{ paddingLeft: '20px' }}>
            <li>jedną dużą i jedną małą literę,</li>
            <li>cyfrę,</li>
            <li>znak specjalny (!@#$%.,/?^&*),</li>
            <li>mieć co najmniej 8 znaków.</li>
          </ul>
        </div>
      );
    } else {
      setPasswordError("Hasło nie spełnia wymagań");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Rejestracja
          </Typography>
          <TextField
          label="imie"
            placeholder="imie"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
          label="nazwisko"
            placeholder="nazwisko"
            value={inputs.surname}
            onChange={handleChange}
            name="surname"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
          label="email"
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
          label="hasło"
            placeholder="Hasło"
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
            onBlur={handlePasswordValidation}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={warunki}
                onChange={() => setWarunki(!warunki)}
                name="akceptujeWarunki"
              />
            }
            label="Akceptuję warunki"
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Utwórz konto
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Mam już konto
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;