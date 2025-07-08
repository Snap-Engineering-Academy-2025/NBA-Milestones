import React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import fenwayTheme from "./FenwayTheme";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';


const teamNameSX = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    backgroundColor: "#11520",
    "&:hover": {
        backgroundColor: "#2e8b57",
    },
};
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const myHeaders = new Headers();
myHeaders.append("x-api-key", "168966");
myHeaders.append("Accept", "application/json");

const requestOption = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

function Header({
    team1ID, setTeam1ID,
    team2ID, setTeam2ID,
    players1, setPlayers1,
    players2, setPlayers2
}) {

    function fetchTeam(teamName) {
        fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${teamName}`, requestOptions)
            .then((response) => response.json()
            ).then((teamInfo) => {
                let dataId = teamInfo
                const teamID = dataId.teams[0].idTeam
                if (team1ID == "") {
                    setTeam1ID(teamID);
                    fetchPlayers(teamID, setPlayers1);
                }
                else if (team2ID == "") {
                    setTeam2ID(teamID);
                    fetchPlayers(teamID, setPlayers2);
                }
            })
            .catch((error) => console.error(error));
    };

    function fetchPlayers(ID, setterCallback) {
        fetch(`http://localhost:5000/api/players/${ID}`, requestOption)
            .then((response) => response.json())
            .then((playerRoster) => {
                setterCallback(playerRoster.list);
            })
            .catch((error) => console.error(error));
    }

    // console.log("team 1 roster", players1)
    // console.log("team 2 roster", players2)

    return (
        <ThemeProvider theme={fenwayTheme}>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#11520F",
                    py: 3,
                    px: 3
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        border: "3px solid white",
                        mx: "auto",
                        px: 1,
                        py: 1,
                        width: "fit-content",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            justifyContent: 'center',
                            backgroundColor: "#11520F",
                            fontSize: '2.5rem',
                            py: 0,
                            px: 0,
                            position: "relative"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'FenwayReg',
                                justifyContent: 'center',
                                color: '#ea0909',
                                mb: 0,
                                mt: 3
                            }}
                            variant="h4"
                        >
                            Love At First Pitch
                        </Typography>
                        <Button
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: '#696868'
                            }}
                            startIcon={<RotateLeftIcon />}
                            onClick={() => {
                                setTeam1ID("");
                                setTeam2ID("");
                                setPlayers1([]);
                                setPlayers2([]);
                            }}
                        >
                            RESET
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Orioles")}
                        >
                            Orioles
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("White Sox")}
                        >
                            White Sox
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Astros")}
                        >
                            Astros
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Braves")}
                        >
                            Braves
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Cubs")}
                        >
                            Cubs
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Diamondbacks")}
                        >
                            Diamondbacks
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Red Sox")}
                        >
                            Red Sox
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Guardians")}
                        >
                            Guardians
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Angels")}
                        >
                            Angels
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Marlins")}
                        >
                            Marlins
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Reds")}
                        >
                            Reds
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Rockies")}
                        >
                            Rockies
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Yankees")}
                        >
                            Yankees
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Tigers")}
                        >
                            Tigers
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Athletics")}
                        >
                            Athletics
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Mets")}
                        >
                            Mets
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Brewers")}
                        >
                            Brewers
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Dodgers")}
                        >
                            Dodgers
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Rays")}
                        >
                            Rays
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Royals")}
                        >
                            Royals
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Mariners")}
                        >
                            Mariners
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Phillies")}
                        >
                            Phillies
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Pirates")}
                        >
                            Pirates
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Padres")}
                        >
                            Padres
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Blue Jays")}
                        >
                            Blue Jays
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Twins")}
                        >
                            Twins
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Rangers")}
                        >
                            Rangers
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Nationals")}
                        >
                            Nationals
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Cardinals")}
                        >
                            Cardinals
                        </Button>
                        <Button
                            sx={teamNameSX}
                            onClick={() => fetchTeam("Giants")}
                        >
                            Giants
                        </Button>
                    </Box></Box></Box>
        </ThemeProvider>
    );
}
export default Header