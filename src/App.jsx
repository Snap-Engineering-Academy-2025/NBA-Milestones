import './App.css'
import TextField from "@mui/material/TextField";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

function App() {
  const [team, setName] = React.useState("MIA");
  const [file, setFile] = React.useState([]);

  const requestOptions = {
  method: "GET",
  redirect: "follow"
  };

  // useEffect is a function on it's own that gets data from your APi on first load
  // replace last function with useEffect 
  useEffect(() => {
   fetch(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByTeam/2025/${team}?key=e57eb6a0c3f147a4b718b06925030d3d`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let updatedresult = result
        setFile(updatedresult);
      })
      .catch((error) => console.error(error));
  },  []);

  return (
    <Container>
      {console.log(file)}
      <TextField
        id="outlined-controlled"
        label="Search..." 
        variant='outlined'   
        value={team}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Button 
        onClick={fetch}> Search 
        </Button>
      <Grid container spacing={4}> 
        {/* <CardMedia
          component="img"
            height="350px"
            sx={{maxWidth: '200px'}}

        /> */}
          {file.map((player) => 
          <>
            <Typography>
              {player.Name}
            </Typography>
            <Typography>
              {player.Position}
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  )
}

export default App
