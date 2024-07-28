import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";


const TournamentUpdates = () => {
  const [teams, setTeams] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const [tournament, setTournament] = useState({});
  const [inputs, setInputs] = useState({});
  const [user, setUser] = useState('');
  const uId = localStorage.getItem("userId");


  useEffect(() => {


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
        const tournamentId = localStorage.getItem("tournamentId");
        const { data } = await axios.get(`/api/v1/tournament/get-tournament/${tournamentId}`);
        if (data?.success) {
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
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTournamentTeams = async () => {
      try {
        const tournamentId = localStorage.getItem("tournamentId");
        if (!tournamentId) {
          console.log("tournamentId not found in localStorage");
          return;
        }
        const { data } = await axios.get(`/api/v1/team/tournament-teams/${tournamentId}`);
        if (data?.success) {
          const teamsWithResults = data.teams.map((team) => ({
            ...team,
            result1: team.result1,
            result2: team.result2,
            result3: team.result3,

          }));
          setTeams(teamsWithResults);
        } else {
          console.log("No teams found for the specified tournament");
        }
      } catch (error) {
        console.log("Error in retrieving teams:", error);
      }
    };
    getTournamentUpdate();
    getTournamentTeams();
    getUser();
  }, [id]);

  const handleChangeResult1 = async (teamIndex, newValue) => {
    try {
      const updatedTeams = [...teams];
      updatedTeams[teamIndex].result1 = newValue
      setTeams(updatedTeams);
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        result1: newValue,
      });

      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };

  const handleChangeResult2 = async (teamIndex, newValue) => {
    try {
      const updatedTeams = [...teams];
      updatedTeams[teamIndex].result2 = newValue
      setTeams(updatedTeams);
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        result2: newValue,
      });
      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };

  const handleChangeResult3 = async (teamIndex, newValue) => {
    try {
      const updatedTeams = [...teams];
      updatedTeams[teamIndex].result3 = newValue
      setTeams(updatedTeams);
      const { data } = await axios.put(`/api/v1/team/update-team/${teams[teamIndex]._id}`, {
        result3: newValue,
      });

      if (data?.success) {
        console.log("Wynik zaktualizowany pomyślnie");
      }
    } catch (error) {
      console.log("Błąd podczas zapisywania wyniku:", error);
    }
  };

  return (
    <Card
      sx={{
        width: "80%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardContent>
        {teams && teams.length > 0 ? (
          <Table sx={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <TableHead sx={{ justifyContent: "center", alignItems: "center" }}>
              <TableRow sx={{ backgroundColor: "grey" }}>
                <TableCell colSpan={4}>
                  <Typography variant="h5" align="center" fontWeight="bold">
                    Ćwierćfinały
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={300} style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Gospodarze</TableCell>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gospodarzy</TableCell>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gości</TableCell>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Goście</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {Array.from({ length: 4 }, (_, index) => (
                <TableRow key={index}>
                  {console.log("teststtsts" + teams[index * 2]?.teamName)}
                  <TableCell style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                      <div>
                        <img
                          src={teams[index * 2]?.logo}
                          alt="Miniaturka logo drużyny"
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '5%',
                          }}
                        />
                      </div>
                      <div style={{ marginTop: '5px' }}>{teams[index * 2].teamName}</div>
                    </div>
                  </TableCell>
                  {(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") ? (
                    <>
                      <TableCell style={{ textAlign: 'center' }}>
                        <TextField
                          type="number"
                          placeholder={teams[index * 2].result1}
                          value={teams[index * 2].result1}
                          onChange={(e) => handleChangeResult1(index * 2, e.target.value)}
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <TextField
                          type="number"
                          placeholder={teams[index * 2 + 1].result1}
                          value={teams[index * 2 + 1].result1}
                          onChange={(e) => handleChangeResult1(index * 2 + 1, e.target.value)}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 2].result1}</TableCell>
                      <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 2 + 1].result1}</TableCell>
                    </>
                  )

                  }
                  <TableCell style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div>
                        <img
                          src={teams[index * 2 + 1]?.logo}
                          alt="Miniaturka logo drużyny"
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '5%',
                          }}
                        />
                      </div>
                      <div style={{ marginTop: '5px' }}>{teams[index * 2 + 1].teamName}</div>
                    </div>
                  </TableCell>

                </TableRow>
              ))}





              {(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") ? (
                <>
                  <TableRow sx={{ backgroundColor: "grey" }}>
                    <TableCell colSpan={4}>
                      <Typography variant="h5" align="center" fontWeight="bold">
                        Półfinały
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={300} style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Gospodarze</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gospodarzy</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gości</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Goście</TableCell>
                  </TableRow>
                  {Array.from({ length: 2 }, (_, index) => (
                    <TableRow key={index}>


                      {teams[index * 4].result1 < teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 1]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 1].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index * 4 + 1].result2}
                              value={teams[index * 4 + 1].result2}
                              onChange={(e) => handleChangeResult2(index * 4 + 1, e.target.value)}
                            />
                          </TableCell>

                        </>
                      )}
                      {teams[index * 4].result1 > teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4].teamName}</div>
                            </div>
                          </TableCell>

                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index * 4].result2}
                              value={teams[index * 4].result2}
                              onChange={(e) => handleChangeResult2(index * 4, e.target.value)}
                            />
                          </TableCell>
                        </>
                      )}
                      {teams[index * 4].result1 === teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'left' }}>Brak danych</TableCell>

                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder="Oczekiwanie"
                              value={0}
                            />
                          </TableCell>
                        </>
                      )}

                      {teams[index * 4 + 2].result1 > teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center' }}>

                            <TextField
                              type="number"
                              placeholder={teams[index * 4 + 2].result2}
                              value={teams[index * 4 + 2].result2}
                              onChange={(e) => handleChangeResult2(index * 4 + 2, e.target.value)}
                            />
                          </TableCell>

                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 2]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 2].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index * 4 + 2].result1 < teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center' }}>

                            <TextField
                              type="number"
                              placeholder={teams[index * 4 + 3].result2}
                              value={teams[index * 4 + 3].result2}
                              onChange={(e) => handleChangeResult2(index * 4 + 3, e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 3]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 3].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index * 4 + 2].result1 === teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder="Oczekiwanie"
                              value={0}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'rught' }}>Brak danych</TableCell>
                        </>
                      )}

                    </TableRow>

                  ))}

                </>) : (
                <>
                  <TableRow sx={{ backgroundColor: "grey" }}>
                    <TableCell colSpan={4}>
                      <Typography variant="h5" align="center" fontWeight="bold">
                        Półfinały
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={300} style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Gospodarze</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gospodarzy</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gości</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Goście</TableCell>
                  </TableRow>
                  {Array.from({ length: 2 }, (_, index) => (
                    <TableRow key={index}>


                      {teams[index * 4].result1 < teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 1]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 1].teamName}</div>
                            </div>
                          </TableCell>

                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 4 + 1].result2}</TableCell>

                        </>
                      )}
                      {teams[index * 4].result1 > teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4].teamName}</div>
                            </div>
                          </TableCell>

                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 4].result2}</TableCell>
                        </>
                      )}
                      {teams[index * 4].result1 === teams[index * 4 + 1].result1 && (
                        <>
                          <TableCell style={{ textAlign: 'left' }}>Brak danych</TableCell>

                          <TableCell style={{ textAlign: 'center' }}>{0}
                          </TableCell>
                        </>
                      )}

                      {teams[index * 4 + 2].result1 > teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 4 + 2].result2}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 2]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 2].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index * 4 + 2].result1 < teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index * 4 + 3].result2}
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index * 4 + 3]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index * 4 + 3].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index * 4 + 2].result1 === teams[index * 4 + 3].result1 && (
                        <>

                          <TableCell style={{ textAlign: 'center' }}>{0}
                          </TableCell>
                          <TableCell style={{ textAlign: 'right' }}>Brak danych</TableCell>
                        </>
                      )}

                    </TableRow>

                  ))}
                </>)
              }


              {(localStorage.getItem("userId") === tournament?.user?._id || user.role === "admin") ? (
                <>
                  <TableRow sx={{ backgroundColor: "grey" }}>
                    <TableCell colSpan={4}>
                      <Typography variant="h5" align="center" fontWeight="bold" >
                        Finał
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={300} style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Gospodarze</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gospodarzy</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gości</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Goście</TableCell>
                  </TableRow>

                  {Array.from({ length: 1 }, (_, index) => (
                    <TableRow key={index}>



                      {teams[index].result2 > teams[index + 1].result2 && teams[index].result2 > teams[index + 2].result2 && teams[index].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index].result3}
                              value={teams[index].result3}
                              onChange={(e) => handleChangeResult3(index, e.target.value)}
                            />
                          </TableCell>
                        </>
                      )}
                      {teams[index + 1].result2 > teams[index].result2 && teams[index + 1].result2 > teams[index + 2].result2 && teams[index + 1].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 1]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 1].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 1].result3}
                              value={teams[index + 1].result3}
                              onChange={(e) => handleChangeResult3(index + 1, e.target.value)}
                            />
                          </TableCell>
                        </>
                      )}
                      {teams[index + 2].result2 > teams[index + 1].result2 && teams[index + 2].result2 > teams[index].result2 && teams[index + 2].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 2]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 2].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 2].result3}
                              value={teams[index + 2].result3}
                              onChange={(e) => handleChangeResult3(index + 2, e.target.value)}
                            />
                          </TableCell>
                        </>
                      )}
                      {teams[index + 3].result2 > teams[index + 1].result2 && teams[index + 3].result2 > teams[index + 2].result2 && teams[index + 3].result2 > teams[index].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 3]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 3].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 3].result3}
                              value={teams[index + 3].result3}
                              onChange={(e) => handleChangeResult3(index + 3, e.target.value)}
                            />
                          </TableCell>
                        </>
                      )}

                      {teams[index + 4].result2 > teams[index + 5].result2 && teams[index + 4].result2 > teams[index + 6].result2 && teams[index + 4].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 4].result3}
                              value={teams[index + 4].result3}
                              onChange={(e) => handleChangeResult3(index + 4, e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 4]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 4].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 5].result2 > teams[index + 4].result2 && teams[index + 5].result2 > teams[index + 6].result2 && teams[index + 5].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 5].result3}
                              value={teams[index + 5].result3}
                              onChange={(e) => handleChangeResult3(index + 5, e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 5]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 5].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 6].result2 > teams[index + 5].result2 && teams[index + 6].result2 > teams[index + 4].result2 && teams[index + 6].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 6].result3}
                              value={teams[index + 6].result3}
                              onChange={(e) => handleChangeResult3(index + 6, e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 6]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 6].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 7].result2 > teams[index + 5].result2 && teams[index + 7].result2 > teams[index + 6].result2 && teams[index + 7].result2 > teams[index + 4].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField
                              type="number"
                              placeholder={teams[index + 7].result3}
                              value={teams[index + 7].result3}
                              onChange={(e) => handleChangeResult3(index + 7, e.target.value)}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 7]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 7].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}


                    </TableRow>
                  ))}



                </>) : (
                <>
                  <TableRow sx={{ backgroundColor: "grey" }}>
                    <TableCell colSpan={4}>
                      <Typography variant="h5" align="center" fontWeight="bold">
                        Finał
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={300} style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Gospodarze</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gospodarzy</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Wynik Gości</TableCell>
                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Goście</TableCell>
                  </TableRow>

                  {Array.from({ length: 1 }, (_, index) => (
                    <TableRow key={index}>



                      {teams[index].result2 > teams[index + 1].result2 && teams[index].result2 > teams[index + 2].result2 && teams[index].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index].result3}</TableCell>
                        </>
                      )}
                      {teams[index + 1].result2 > teams[index].result2 && teams[index + 1].result2 > teams[index + 2].result2 && teams[index + 1].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 1]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 1].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 1].result3}</TableCell>
                        </>
                      )}
                      {teams[index + 2].result2 > teams[index + 1].result2 && teams[index + 2].result2 > teams[index].result2 && teams[index + 2].result2 > teams[index + 3].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 2]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 2].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 2].result3}</TableCell>
                        </>
                      )}
                      {teams[index + 3].result2 > teams[index + 1].result2 && teams[index + 3].result2 > teams[index + 2].result2 && teams[index + 3].result2 > teams[index].result2 && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 3]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 3].teamName}</div>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 3].result3}</TableCell>
                        </>
                      )}

                      {teams[index + 4].result2 > teams[index + 5].result2 && teams[index + 4].result2 > teams[index + 6].result2 && teams[index + 4].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 4].result3}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 4]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 4].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 5].result2 > teams[index + 4].result2 && teams[index + 5].result2 > teams[index + 6].result2 && teams[index + 5].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 5].result3}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 5]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 5].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 6].result2 > teams[index + 5].result2 && teams[index + 6].result2 > teams[index + 4].result2 && teams[index + 6].result2 > teams[index + 7].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 6].result3}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 6]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 6].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}
                      {teams[index + 7].result2 > teams[index + 5].result2 && teams[index + 7].result2 > teams[index + 6].result2 && teams[index + 7].result2 > teams[index + 4].result2 && (

                        <>
                          <TableCell style={{ textAlign: 'center', fontSize: "50px" }}>{teams[index + 7].result3}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <img
                                  src={teams[index + 7]?.logo}
                                  alt="Miniaturka logo drużyny"
                                  style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '5%',
                                  }}
                                />
                              </div>
                              <div style={{ marginTop: '5px' }}>{teams[index + 7].teamName}</div>
                            </div>
                          </TableCell>
                        </>
                      )}


                    </TableRow>
                  ))}
                </>
              )}



            </TableBody>
          </Table>
        ) : (
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
        )}


      </CardContent>
    </Card>
  );

};

export default TournamentUpdates;