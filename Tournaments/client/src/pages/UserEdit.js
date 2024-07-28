import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UserEdit = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({
    username: "",
    surname: "",
    email: "",
    password: "",
  });

  const getUserUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${id}`);
      if (data?.success) {
        setUser(data?.user);
        setInputs({
          username: data?.user.username,
          surname: data?.user.surname,
          email: data?.user.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getUserUpdate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/user/update-user/${id}`, {
        username: inputs.username,
        surname: inputs.surname,
        email: inputs.email,
        password: inputs.password


      });
      if (data?.success) {
        toast.success("Dane zaktualizowane");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Nieprawidłowe hasło. Brak autoryzacji do zmiany danych.");
      } else {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
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
          Zaktualizuj dane
        </Typography>
        <TextField
          placeholder="imie"
          value={inputs.username}
          onChange={handleChange}
          name="username"
          margin="normal"
          type={"text"}
          required
        />
        <TextField
          placeholder="nazwisko"
          value={inputs.surname}
          onChange={handleChange}
          name="surname"
          margin="normal"
          type={"text"}
          required
        />

        <TextField
          placeholder="email"
          value={inputs.email}
          name="email"
          margin="normal"
          type={"email"}
          required
          onChange={handleChange}
        />
        <h3>Weryfikacja użytkownika</h3>
        <TextField
          placeholder="hasło"
          value={inputs.password}
          name="password"
          margin="normal"
          type="password"
          required
          onChange={handleChange}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            onClick={handleCancel}
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="grey"
          >
            Anuluj
          </Button>

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Zaktualizuj
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default UserEdit;
