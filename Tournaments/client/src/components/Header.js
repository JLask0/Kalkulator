import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import Logo from './Logo.png'
import axios from "axios";
import Cookies from 'js-cookie';

const Header = () => {

  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [value, setValue] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    verification: "",
  });

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Wylogowano");
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.clear();
      Cookies.remove('token');
    } catch (error) {
      console.log(error);
    }
  };


  const getUserUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${id}`);
      if (data?.success) {
        setUser(data?.user);
        setInputs({
          username: data?.user.username,
          surname: data?.user.surname,
          email: data?.user.email,
          password: data?.user.password,
          role: data?.user.role,
          verification: data?.user.verification,

        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserUpdate();
  }, [id]);


  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const avatarColor = generateColorFromName(inputs.username || '');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    navigate(`/user-update/${id}`);
  };
  const handleDashboard = () => {
    navigate(`/admin/dashboard`);
  };

  const handlePassword = () => {
    navigate(`/user-password/${id}`);
  };

  return (
    <>
      <AppBar position="sticky" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Toolbar>
          <Typography variant="h4" ><img src={Logo} height={100} /></Typography>
          {isLogin && (

            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                {[
                  { label: "Strona główna", to: "/home" },
                  { label: "Turnieje", to: "/tournaments" },
                  ...(inputs.verification === true
                    ? [
                      { label: "Moje turnieje", to: "/my-tournaments" },
                      { label: "Stwórz Turniej", to: "/create-tournament" },
                      { label: "Dla sędziów", to: "/referee" },
                    ]
                    : []),

                  { label: "Kontakt", to: "/about" },
                ].map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    LinkComponent={Link}
                    to={tab.to}
                  />
                ))}
              </Tabs>
            </Box>

          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Zaloguj się
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Zarejestruj się
                </Button>
              </>
            )}
            {isLogin && (
              <Box>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  sx={{ margin: 1, color: "white" }}
                >
                  <Avatar sx={{ bgcolor: avatarColor }} title="zarządzaj kontem">
                    {inputs.username && inputs.username.charAt(0)}{inputs.surname && inputs.surname.charAt(0)}
                  </Avatar>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { handleMenuClose(); handleEdit(); }}>Edytuj profil</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); handlePassword(); }}>Zmień hasło</MenuItem>

                  {user.role === "admin" && (
                    <MenuItem onClick={() => { handleMenuClose(); handleDashboard(); }}>
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Wyloguj</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;




