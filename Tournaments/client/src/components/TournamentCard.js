import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { FaFutbol } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TournamentCard({
  title,
  image,
  username,
  surname,
  time,
  id,
  time1,
}) {
  const navigate = useNavigate();
  const [oceny, setOceny] = useState([]);

  const getTournamentRating = async () => {
    try {
      const { data } = await axios.get(`/api/v1/rating/tournament-ratings/${id}`);
      setOceny(data?.ratings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTournamentRating();
  }, [id]);

  const handleDetail = () => {
    navigate(`/tournament-details/${id}`);
    localStorage.setItem("tournamentId", id);
  };

  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const avatarColor = generateColorFromName(username || '');

  function formatTime(time) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedTime = new Date(time).toLocaleDateString(undefined, options);
    return formattedTime;
  }

  const formattedTime = formatTime(time);

  const sumaOcen = oceny.reduce((acc, curr) => acc + curr.ocena, 0);
  const srednia = Math.floor(sumaOcen / oceny.length);

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedDate = new Date(dateString).toLocaleString(undefined, options);
    return formattedDate;
  }


  return (
    <Button
      onClick={handleDetail}
      sx={{
        justifyContent: 'center',
        alignItems: 'left',
        width: "29%",
        margin: "2%",
        mt: 2,
        borderRadius: "8px",
        padding: 2,


      }}
    >
      <Card sx={{ height: '100%', width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe" title="zarządzaj kontem">
              {username && username.charAt(0)}{surname && surname.charAt(0)}
            </Avatar>
          }
          title={"założyciel " + username}
          subheader={"publikacja: " + formattedTime}
          sx={{ backgroundColor: 'grey' }}
        />
        <CardMedia component="img" height="400" image={image} alt="Paella dish" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" color="text.secondary">
            Tytuł: {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Rozpoczęcia: {formatDate(time1)}
          </Typography>
        </CardContent>
        <CardContent sx={{ backgroundColor: "lightGrey", boxShadow: "5px 5px 10px Blue" }}>
          {[...Array(5)].map((star, i) => (
            <label key={i}>
              <FaFutbol
                className="star"
                color={i < srednia ? "#0a0a0a" : "#e4e5e9"}
                size={30}
              />
            </label>
          ))}
        </CardContent>
      </Card>
    </Button>
  );
}