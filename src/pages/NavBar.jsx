import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function NavBar() {
    return ( 

        <Box 
            sx={{ 
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%", 
                zIndex: 1000,
                backgroundColor: "lightgray",
            }}
        >
            <Box
                sx={{ 
                display: "flex",
                justifyContent: "flex-start",

            }}>
                <Typography variant="h2">Mementos</Typography>
            </Box>

            <Box >
                <Typography variant="h4">Mementos</Typography>
            </Box>
        </Box>
    )
}