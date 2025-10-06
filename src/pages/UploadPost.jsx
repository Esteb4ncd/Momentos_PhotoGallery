import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function UploadPost() {
    return (
        <Container 
            maxWidth="lg" 
            sx={{ 
                display: "flex", 
                flexDirection: "row", 
                gap: 4, 
                mb: 2, 
                alignItems: "center" 
            }}
        >
            {/* Left Column */}
            <Box 
                sx={{ 
                    flex: 1,
                    flexBasis: 0,
                    minWidth: 0,
                    display: "flex",
                    gap: 0,
                    p: 3,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    boxSizing: "border-box",
                    borderRadius: 2,
                    backgroundColor: "lightgray",
                    height: 300
                }}
            >
                {/* Username */}
                <Box 
                    sx={{ 
                        width: 160,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        boxSizing: "border-box",
                        p: 0,
                        borderRadius: 2,
                        backgroundColor: "lightgray",
                    }}
                >
                    <Typography variant="6"
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Username
                    </Typography>
                </Box>

                {/* Caption box */}
                <Box 
                    sx={{ 
                        flex: 1,
                        minWidth: 30,
                        p: 2,
                        boxSizing: "border-box",
                        borderRadius: 2,
                        backgroundColor: "lightgray",
                        display: "flex",
                        flexDirection: "column",
                        fontSize: '8px',
                    }}
                >
                    <TextField 
                        multiline 
                        placeholder='Type Caption Here' 
                        rows={4}
                        sx={{ ml: 2, width: "100%", fontSize: '8px' }}
                    />
                </Box>

                {/* Location button */}
                <Box
                    sx={{

                    }}
                >
                    <Button
                        variant='contained'
                        color='black'
                        sx={{
                            mt: 2, 
                            gap: 2, 
                            fontSize: '12px',
                            fontWeight: 'bold',
                            borderRadius: 30,
                            backgroundColor: '#b3b3b3ff',
                            color: 'black'
                        }}
                    >
                        ADD LOCATION
                    </Button>
                </Box>
            </Box>

            <Box 
                sx={{ 
                    flex: 1, 
                    p: 3, 
                    boxSizing: "border-box", 
                    borderRadius: 2, 
                    backgroundColor: "lightgray", 
                    height: 300 
                }}
            >
                <Box sx={{ mb: 2, gap: 2 }}> 
                    <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
                        alt="Preview" 
                        style={{ 
                            width: "100%", 
                            height: "170px", 
                            objectFit: "cover", 
                            display: "block" 
                        }} 
                    />
                </Box>

                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "flex-end" 
                    }}>
                    <Button 
                        variant="contained" 
                        color="black" 
                        sx={{ 
                            mt: 2, 
                            gap: 2, 
                            fontWeight: 'bold',
                            borderRadius: 30,
                            backgroundColor: '#424242ff',
                            color: 'white'
                            }}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </ Container>

    )
}