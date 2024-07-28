import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, SpeedDialIcon, Button, TextareaAutosize, Grid, Table, TableHead, TableCell, TableRow, TableContainer, TableBody } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "../components/Rating";
import CommentList from "../components/CommentList";

const TournamentUpdates = () => {
  const [tournament, setTournament] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const [teams, setTeams] = useState([]);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState('');
  const uId = localStorage.getItem("userId");
  const numberOfTeams = teams.length;

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${uId}`);
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  }

  const getTournamentUpdate = async () => {
    try {
      const { data } = await axios.get(`/api/v1/tournament/get-tournament/${id}`);

      if (data?.success) {
        console.log(data.tournament.comments);
        setTournament(data?.tournament);
        setInputs({
          title: data?.tournament.title,
          description: data?.tournament.description,
          image: data?.tournament.image,
          city: data?.tournament.city,
          county: data?.tournament.county,
          province: data?.tournament.province,
          street: data?.tournament.street,
          buildingAddress: data?.tournament.buildingAddress,
          time: data?.tournament.time,
          userName: data?.tournament?.user?.username,
          refName: data?.tournament?.referee?.firstName,
        });
        setComments(data?.tournament?.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTournamentTeams = async () => {
    try {
      const tournamentId = localStorage.getItem("tournamentId");
      if (!tournamentId) {
        console.log("Nie znaleziono StorageId");
        return;
      }
      const { data } = await axios.get(`/api/v1/team/tournament-teams/${tournamentId}`);
      if (data?.success) {
        setTeams(data?.teams);
      } else {
        console.log("Nie ma zespołów w takim zespole");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showLog = () => {
    console.log(comments)
  }
  useEffect(() => {
    getTournamentUpdate();
    getTournamentTeams();
    showLog();
    getUser();
  }, [id]);

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

  const addComment = async (e) => {
    e.preventDefault();
    const tournamentId = localStorage.getItem("tournamentId");
    try {
      const { data } = await axios.put(`/api/v1/tournament/comment/${tournamentId}`, { comment, uId });
      if (data.success === true) {
        setComment('');
        toast.success("Komentarz dodany");
        window.location.reload();
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error(error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/tournament-updates/${id}`);
  };
  const handleBack = () => {
    navigate(`/`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/tournament/delete-tournament/${id}`);
      if (data?.success) {
        alert("Turniej usunięty");
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const { data } = await axios.delete(`/api/v1/team/delete-team/${teamId}`);
      if (data?.success) {
        alert("Team usunięty");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStart = () => {
    navigate("/StartTournament");
  }

  const handleAdd = () => {
    navigate(`/add-team`);
  };

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleEditTeam = async (teamId) => {
    navigate(`/EditTeam/${teamId}`);
  };
  const handleTeamClick = async (teamId) => {
    navigate(`/showTeam/${teamId}`);
  };

  return (
    <Box sx={{ background: '#ccc', fontFamily: "Google Sans,arial,sans-serif" }}>
      <Card
        sx={{
          width: "80%",
          margin: "auto",
          mt: 2,
          padding: 2,
          marginTop: 5,
          marginBottom: 5,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
          backgroundColor: "#f2f2f2",
          color: "#333",
          borderRadius: '10px',
        }}
      >
        {(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '3%',
                marginTop: '30px',
                marginBottom: '10px',
              }}
              image={inputs.image}
              alt="Zdjęcie turnieju"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold" variant="h2" color="text.secondary" gutterBottom>
              {tournament.title}
            </Typography>
            <Typography gutterBottom>
              Założyciel: {inputs.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Start: {formatDate(tournament.time)}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Publikacja: {formatDate(tournament.createdAt)}
            </Typography>
          </Grid>
        </Grid>
        <CardContent>
          <Grid
            margin={5}
            style={{ backgroundColor: '#e1e2e3', padding: '15px', borderRadius: '10px' }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Opis</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph >
              {tournament.description}
            </Typography>
          </Grid>
          <Grid
            margin={5}>
            {inputs.refName !== undefined && (
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Sędzia:</strong> {inputs.refName}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Kraj:</strong> {tournament.country}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Miasto:</strong> {tournament.city}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Województwo:</strong> {tournament.province}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Ulica:</strong> {tournament.street}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Adres:</strong> {tournament.buildingAddress}
            </Typography>
          </Grid>

          {numberOfTeams >= 0 && numberOfTeams <= 7 && inputs.time > getCurrentDateTime() && user.verification === true && (
            <Typography>
              <IconButton onClick={handleAdd} sx={{ backgroundColor: '#333', marginRight: '8px' }}>
                <SpeedDialIcon color="action" />
              </IconButton>
              <span style={{ color: '#000' }}>Dodaj drużynę</span>
            </Typography>
          )}

          {numberOfTeams === 8 && (
            <Typography>
              <IconButton
                justifyContent="center" alignItems="center"
                onClick={handleStart}
                style={{
                  background: '#95969c',
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                Zapisywanie zakończone, Przejdź do drabinki turnieju
              </IconButton>
            </Typography>
          )}
          <Grid container spacing={2} justifyContent="center" alignItems="center">

            <Grid item xs={12} sm={7}
            >
              {teams && teams.length > 0 ? (
                <TableContainer >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Typography variant="h5" align="center" fontWeight="bold">
                            Zespoły
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif", borderRadius: '10px 0 0 10px' }}>Nazwa zespołu</TableCell>
                        <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif" }}>Logo</TableCell>
                        <TableCell style={{ textAlign: 'center', background: '#95969c', fontFamily: "Google Sans,arial,sans-serif", borderRadius: '0 10px 10px 0' }}>Opcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teams.map((team) => (
                        <TableRow key={team._id} style={{ textAlign: 'center' }}>
                          <TableCell style={{ textAlign: 'center' }}>
                            <Button onClick={() => handleTeamClick(team._id)} style={{ color: '#000000' }}>
                              {team.teamName}
                            </Button>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <Button onClick={() => handleTeamClick(team._id)}>
                              <img
                                src={team.logo}
                                alt="Miniaturka logo drużyny"
                                style={{
                                  width: '70px',
                                  height: '70px',

                                  margin: '0 auto',
                                  borderRadius: '5%',
                                }}
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            {numberOfTeams <= 7 && (
                              (localStorage.getItem("userId") === team?.user || localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") && (
                                <>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton onClick={() => handleEditTeam(team._id)} sx={{ marginRight: '8px' }}>
                                      <ModeEditIcon color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteTeam(team._id)}>
                                      <DeleteIcon color="error" />
                                    </IconButton>
                                  </div>
                                </>
                              )
                            )}

                            {numberOfTeams > 7 && (
                              (localStorage.getItem("userId") === team?.user || localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") && (
                                <>
                                  <IconButton onClick={() => handleEditTeam(team._id)} sx={{ marginRight: "90%" }}>
                                    <ModeEditIcon color="info" />
                                  </IconButton>
                                </>
                              )
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <>
                  {numberOfTeams >= 0 && numberOfTeams < 7 && inputs.time < getCurrentDateTime() ? (
                    <>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "auto",
                          marginBottom: "auto",
                          height: "10vh",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <h4>Nie dodano jeszcze żadnego zespołu.</h4>
                        <p>Dodaj swoją drużynę</p>
                      </div>
                    </>
                  )}

                </>
              )}
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
          </Grid>
          {numberOfTeams >= 0 && numberOfTeams < 7 && inputs.time < getCurrentDateTime() && (
            <Typography>
              <IconButton onClick={handleBack}

                style={{
                  marginLeft: "100px",
                  backgroundColor: 'red',
                  fontWeight: "bold",
                  padding: '10px',
                  borderRadius: '8px',
                }}>
                Wydarzenie nie odbyło się
              </IconButton>
            </Typography>
          )}
          <Typography
            padding={5}>
            Oceń
            <Rating />
          </Typography>
          <Grid
            padding={5}>
            {comments.length === 0 ? '' : (
              <>
                <Typography
                  variant='h5'
                  sx={{ pt: 3, mb: 2 }}>
                  Komentarze:
                </Typography>
                {comments.map((comment) => (
                  <CommentList key={comment._id} name={comment.user.username} text={comment.text} surname={comment.user.surname} />
                ))}
              </>
            )}
            {
              <Box sx={{ pt: 1, pl: 3, pb: 3 }}>
                <h2>Dodaj komentarz</h2>
                <form onSubmit={addComment}>
                  <TextareaAutosize
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}

                    minRows={4}
                    placeholder="Dodaj komentarz..."
                    style={{
                      width: 500, padding: "5px", resize: "none",
                      outline: 'none',
                      borderRadius: '10px',
                    }}
                  />
                  <Box sx={{ pt: 1 }}>
                    <Button type='submit' variant='contained'>
                      Dodaj Komentarz
                    </Button>
                  </Box>
                </form>
              </Box>

            }
          </Grid>
        </CardContent>

      </Card>
    </Box>
  );
};

export default TournamentUpdates;