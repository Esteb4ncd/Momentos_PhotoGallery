import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

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
                display: "flex",           // Add this
                flexDirection: "row",      // Add this
                alignItems: "center",      // Vertically center children
                justifyContent: "space-between", // Optional: space out logo and buttons
                p: 0,
                height: 72, 
            }}
        >
            {/* Left Side Box (Logo) */}
            <Box
                sx= {{ 
                display: "fixed",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: 'center',
                p: 2,
            }}>
                <Typography variant="h4"
                sx={{
                    fontWeight: 'bold',
                    alignContent: 'center',
                }}
                >
                    MOMENTOS
                </Typography>
            </Box>

            {/* Right Side Box (Buttons) */}
            <Box
                sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 2,
                gap: 2,
                }}
            >
                <ButtonGroup 
                    variant="text" 
                    aria-label="text button group" 
                    sx={{ '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                    borderRight: '1px solid black',
                    backgroundColor: '3f3f3fff',
                    },
                    }}
                >
                    <Button 
                        sx= {{
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        p: 2,
                        color: "text.primary",

                        '&:hover': {
                            backgroundColor: '#3f3f3fff',
                            color: 'white',
                            pointer: 'pointer',
                            border: '1px solid black',
                        },
                        '&:active': {
                            border: '1px solid black',
                        }
                        }}
                    >
                        <Typography variant="h6"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Gallery
                        </Typography>
                    </Button>
                    <Button 
                        sx= {{
                        display: "fixed",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        p: 2,
                        color: "text.primary",
                        '&:hover': {
                            backgroundColor: '#3f3f3fff',
                            color: 'white',
                            pointer: 'pointer'
                        }
                        }}
                    >
                        <Typography variant="h6"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Upload
                        </Typography>
                    </Button>
                    <Button 
                        sx= {{
                        display: "fixed",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        p: 2,
                        color: "text.primary",
                        '&:hover': {
                            backgroundColor: '#3f3f3fff',
                            color: 'white',
                            pointer: 'pointer'
                        }
                        }}
                    >
                        <Typography variant="h6"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Profiles
                        </Typography>
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}