import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, TextField, Button, Link, Box } from "@mui/material";
import axios from "axios";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const TournamentAbout = () => {
  const [contactInfo] = useState({
    email: "TourneyForge@gmail.com",
    phone: "123-456-789",
    address: "ul. Lubelska 1, Lubartów, Polska",
  });

  const [message, setMessage] = useState("");
  const [isMessageSent, setMessageSent] = useState(false);

  const handleSendMessage = async () => {
    try {

      await axios.post("URL_DO_API_WYSYŁAJĄCEGO_WIADOMOŚCI", {
        email: contactInfo.email,
        message: message,
      });


      setMessageSent(true);
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
    }
  };
  const textAndLinkStyle = {
    color: 'black',
    textDecoration: 'none',
  };

  return (
    <Card

      sx={{
        maxWidth: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        margin: "auto",
        marginTop: 5,
        marginBottom: 5,
        boxShadow: "10px 20px 30px #ccc",
        padding: 3,
        borderRadius: 5,
      }}>
      <CardContent>
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="gray"
          sx={{ textTransform: "uppercase" }}
        >

          Kontakt
        </Typography>
        <Grid container spacing={10} textAlign="center">
          <Grid item xs={12} marginTop={5}>
            <Typography variant="h6">Informacje kontaktowe:</Typography>
            <Typography style={{ textIndent: "20px" }}>Email: {contactInfo.email}</Typography>
            <Typography style={{ textIndent: "20px" }}>Telefon: {contactInfo.phone}</Typography>
            <Typography style={{ textIndent: "20px" }}>Adres: {contactInfo.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Odwiedź Nasze Social Media:</Typography>
            <Typography style={{ textIndent: "20px" }}>
              <Link href="https://www.facebook.com/" style={textAndLinkStyle}>
                TourneyForge {"    "}

                <FacebookIcon style={{ color: "#4682B9" }} />
              </Link>
            </Typography>

            <Typography style={{ textIndent: "20px" }}>
              <Link href="https://www.instagram.com/" style={textAndLinkStyle}>
                TourneyForge {"    "}
                <InstagramIcon style={{ color: "#FF1493" }} />
              </Link>
            </Typography>

            <Typography style={{ textIndent: "20px" }}>
              <Link href="https://www.youtube.com/" style={textAndLinkStyle}>
                TourneyForge {"    "}
                <YouTubeIcon style={{ color: "red" }} />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Typography variant="h6">Szybki kontakt z biurem obsługi klienta:</Typography>
            <TextField
              label="Napisz wiadomość"
              variant="outlined"
              fullWidth
              multiline
              rows={4}

              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Wyślij
            </Button>
            {isMessageSent && <Typography style={{ marginTop: "16px" }}>Wiadomość wysłana!</Typography>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>


  );
};

export default TournamentAbout;