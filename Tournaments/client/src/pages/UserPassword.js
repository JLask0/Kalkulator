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
    password: "",
  });

  const getUserUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${id}`);
      if (data?.success) {
        setUser(data?.user);
        setInputs({
          password: data?.user.password,
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
      const { data } = await axios.put(`/api/v1/user/update-password/${id}`, {
        oldPassword: inputs.oldPassword,
        password: inputs.newPassword,
      });
      if (data?.success) {
        toast.success("Hasło zostało zmienione");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Wystąpił błąd");
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
          Zmień hasło
        </Typography>
        <TextField
          placeholder="Stare hasło"
          name="oldPassword"
          margin="normal"
          type={"password"}
          required
          onChange={handleChange}
        />
        <TextField
          placeholder="Nowe hasło"
          name="newPassword"
          margin="normal"
          type={"password"}
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
