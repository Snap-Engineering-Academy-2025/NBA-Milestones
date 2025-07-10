import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

export default function WinnerCard({ player }) {
  const [hearts, setHearts] = useState([]);
  console.log("inside winner")

  useEffect(() => {
    document.body.style.backgroundColor = "pink";
    if (!player || !player.strThumb) return;
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100, // percentage
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation duration (2s)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 2000);
    }, 300); // create a new heart every 300ms

    return () => clearInterval(interval);
  }, []);

  if (!player || !player.strThumb) {
    return null;
  }

  return (

    <Box sx={{
      // height: "100vh",
      // width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center", // Align content to top
      pt: 0,
      pb: 0,
      position: "relative",
      overflow: "hidden",
    }}>
      <Typography variant="h3"
        sx={{ color: "#ea0909", fontFamily: "Fenway" }}>
        💖 HOME RUN! 💖
      </Typography>

      <Card
        sx={{
          width: 340,
          borderRadius: 3,
          border: "4px solid pink",
          outline: "8px solid #fce4ec",
          boxShadow: "0 0 60px rgba(255,0,100,0.4)",
          mx: "2",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={player.strThumb}
          alt={`Photo of ${player.strPlayer}`}
          sx={{ height: 400, objectFit: "cover" }}
        />
        <CardContent sx={{ backgroundColor: "#ffeef5" }}>
          <Typography variant="h5" fontWeight="bold">
            {player.strPlayer}
          </Typography>
          <Typography>{player.strTeam}</Typography>
          <Typography>{player.strPosition}</Typography>
        </CardContent>
      </Card>

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <Box
          key={heart.id}
          className="floating-heart"
          sx={{
            left: `${heart.left}%`,
            top: '80%',
          }}
        >
          💖
        </Box>
      ))}
    </Box>
  );
}
