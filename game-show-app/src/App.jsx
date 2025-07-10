import React, { useState } from 'react';
import './index.css';
import { useEffect } from 'react';
import './App.css';
import Header from './header.jsx'
import PlayerCard from './playerCard.jsx'
import { Box, Button, Container, Slider, ThemeProvider } from '@mui/material'
import { Typography } from '@mui/material'
import fenwayTheme from './FenwayTheme.js'
import WinnerCard from './winnerCard.jsx';

const myHeaders = new Headers();
myHeaders.append("x-api-key", "168966");
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

const marks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 10,
    label: '10',
  },
];


function App() {
  // state var to hold the team name
  const [team1ID, setTeam1ID] = React.useState("");
  const [team2ID, setTeam2ID] = React.useState("");
  // state var to hold the array of players on the team
  const [players1, setPlayers1] = React.useState([]);
  const [players2, setPlayers2] = React.useState([]);

  // Player stats vars
  const [player1Stats, setPlayer1Stats] = useState({});
  const [player2Stats, setPlayer2Stats] = useState({});

  const [currentPlayer1, setCurrentPlayer1] = React.useState();
  const [currentPlayer2, setCurrentPlayer2] = React.useState();

  const [rounds, setRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);

  const [winner, setWinner] = useState();
  const [selectionsMade, setSelectionsMade] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setRounds(newValue);
  };

  function getRandomPlayer(playersArray) {
    const randomIndex = Math.floor(Math.random() * playersArray.length);
    return playersArray[randomIndex];
  }

  // Gets the stats of an individual player
  function fetchPlayerStats(playerID, setterFunc) {

    fetch(`http://localhost:5000/api/player/${playerID}`, requestOptions)
      .then((response) => response.json())
      .then((stats) => {
        console.log("stats", stats.lookup[0], playerID)
        setterFunc(stats.lookup[0]);
      })
      .catch((error) => console.error("Error", error));
  };

  function nextRound() {
    console.log("calling next round")
    if (players1.length > 0 && players2.length > 0) {
      console.log("entered next round", players1)
      const nextPlayer1 = getRandomPlayer(players1);
      const nextPlayer2 = getRandomPlayer(players2);

      if (nextPlayer1?.idPlayer && nextPlayer2?.idPlayer) {
        console.log("entered to fetch", nextPlayer1)
        fetchPlayerStats(nextPlayer1.idPlayer, setPlayer1Stats);
        fetchPlayerStats(nextPlayer2.idPlayer, setPlayer2Stats);

        setCurrentPlayer1(nextPlayer1);
        setCurrentPlayer2(nextPlayer2);
      }
      else {
        setCurrentRound((prev) => prev + 1);
      }
    }
    else {
      console.error("Missing player ID");
    }
  }

  // Loads the players once the user chooses both teams
  function handleNextRound() {
    console.log(" enter use effect", players1, players2)
    if (players1.length > 0 && players2.length > 0) {
      console.log("entered if ")
      nextRound();
    }
    else {
      alert("Please select two teams from the top first!")
    }
  };

  function handlePlayerChoice(selectedPlayer) {
    if (selectionsMade + 1 >= rounds) {
      setWinner(selectedPlayer);
    } else {
      setSelectionsMade(prev => prev + 1);

      if (selectedPlayer.idPlayer === currentPlayer1?.idPlayer) {
        const newOpponent = getRandomPlayer(players2);
        fetchPlayerStats(newOpponent.idPlayer, setPlayer2Stats);
        setCurrentPlayer2(newOpponent);
      } else {
        const newOpponent = getRandomPlayer(players1);
        fetchPlayerStats(newOpponent.idPlayer, setPlayer1Stats);
        setCurrentPlayer1(newOpponent);
      }
    }
  }

  console.log("team 1 dcasd", players1)
  console.log("team 2 roster", players2)


  return (
    
    <ThemeProvider theme={fenwayTheme} >
      <Container>
        {!winner &&
          <Header
            team1ID={team1ID}
            setTeam1ID={setTeam1ID}
            team2ID={team2ID}
            setTeam2ID={setTeam2ID}
            players1={players1}
            setPlayers1={setPlayers1}
            players2={players2}
            setPlayers2={setPlayers2}
          />
        }
        {!winner &&
          <Button sx={{ mt: 40, color: "black" }} onClick={handleNextRound}>Start Round</Button>
        }
        {!winner &&
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              px: 10,
            }}
          >
            <PlayerCard
              player={player1Stats} side="left"
              onChoose={() => handlePlayerChoice(player1Stats)}
            />

            <Box>
              <Typography gutterBottom variant="h6">
                Number of Rounds: {rounds}
              </Typography>

              <Slider
                value={rounds}
                onChange={handleSliderChange}
                aria-label="Rounds"
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={3}
                max={10}
                sx={{ maxWidth: 300 }}

              />
            </Box>

            <PlayerCard
              player={player2Stats} side="right"
              onChoose={() => handlePlayerChoice(player2Stats)}
            />

          </Box>}

        {winner && <WinnerCard player={winner} />}

        {/* populate card with player image, number, bday, name, position, height, weight, bitrh location */}
        {/* if card is not chosen populate a new card */}
        {/* need to create a slider that allows the user to choose the number of rounds ranging from 3-10,  */}
        {/* go as long as the player chose the number of rounds */}
        {/* at last round they equal the winner */}
        {/* cut to new page with just the winners baseball card on it with hearts and kisses */}
        {/* maybe create the leaderboard */}

      </Container>

    </ThemeProvider>
  );
}

export default App
