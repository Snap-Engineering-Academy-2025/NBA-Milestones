import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia } from '@mui/material';
import { Box } from '@mui/material'

export default function PlayerCard({ player, onChoose }) {
    console.log("player", player)
    return (
        <Button
            onClick={() => onChoose(player)}
            sx={{
                fontFamily: 'Fenway'
            }}>
            <Card
                sx={{
                    width: 320,
                    height: 420,
                    borderRadius: 3,
                    border: '3px solid black',
                    outline: '8px solid white',
                    outlineOffset: '0',
                    boxShadow: '0 0 40px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <CardMedia
                    component="img"
                    image={player.strThumb}
                    alt={`Pick teams!`}
                    sx={{
                        height: 280,
                        objectFit: 'cover',
                        borderBottom: '3px solid #ccc',
                    }}
                />

                <Box
                >
                    {player.strPlayer}
                </Box>

                <CardContent
                    sx={{
                        px: 2,
                        pt: 1,
                        pb: 2,
                        fontSize: '5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        backgroundColor: '#F5EEE2',
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}
                    >
                        Team: {player.strTeam || 'N/A'}
                    </Typography>
                    <Typography variant="subtitle2"
                    >
                        Position: {player.strPosition || 'N/A'}  |  Number: {player.strNumber || 'N/A'}
                    </Typography>
                    <Typography variant="body2"
                    >
                        Height: {player.strHeight || 'N/A'}  | Weight: {player.strWeight || 'N/A'}
                    </Typography>
                    <Typography variant="body2"
                    >
                        Born: {player.dateBorn || 'N/A'}
                    </Typography>
                    <Typography variant="body2"
                    >
                        Birthplace: {player.strBirthLocation || 'N/A'}
                    </Typography>
                    <Typography variant="body2"
                    >
                        Nationality: {player.strNationality || 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Button >
    );
}
