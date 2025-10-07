import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import UploadPostModal from './UploadPostModal';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
// Upload Post Modal Stuff:
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleGalleryClick = () => navigate('/gallery');
    const handleProfileClick = () => navigate('/profilepage');

    return ( 
    
        <>
            <Box 
                sx={{ 
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%", 
                    zIndex: 1000,
                    backgroundColor: "white",
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
                        color: '#4f40b4',
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
                        sx={{ 
                            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                                position: 'relative',
                                borderRight: 'none',
                                '&:after': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    right: 0,
                                    top: '25%',
                                    height: '50%',
                                    width: '1px',
                                    backgroundColor: 'black',
                                }
                        },
                    }}
                    >
                        {/* Gallery Button */}
                        <Button 
                            onClick={handleGalleryClick}
                            sx= {{
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            p: 1,
                            color: "#4f40b4",

                            '&:hover': {
                                backgroundColor: 'rgba(79, 64, 180, 0.8)',
                                color: 'white',
                                pointer: 'pointer',
                                borderRadius: '6px',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:active': {
                                border: '1px solid black',
                            }
                            }}
                        >
                            <Typography variant="h6"
                                sx={{
                                    fontWeight: 'normal',
                                }}
                            >
                                Gallery
                            </Typography>
                        </Button>

                        {/* Upload Button */}
                        <Button onClick={handleOpen}
                            sx= {{
                            display: "fixed",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            p: 1,
                            color: "#4f40b4",
                            '&:hover': {
                                backgroundColor: 'rgba(79, 64, 180, 0.8)',
                                color: 'white',
                                pointer: 'pointer',
                                borderRadius: '6px'
                            },
                            '&:focus': {
                                outline: 'none',
                            }
                            }}
                        >
                            <Typography variant="h6"
                                sx={{
                                    fontWeight: 'normal',
                                }}
                            >
                                Upload
                            </Typography>
                        </Button>

                        {/* Profile */}
                        <Button 
                            onClick={handleProfileClick}
                            sx= {{
                            display: "fixed",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            p: 1,
                            color: "#4f40b4",
                            '&:hover': {
                                backgroundColor: 'rgba(79, 64, 180, 0.8)',
                                color: 'white',
                                pointer: 'pointer',
                                borderRadius: '6px'
                            },
                            '&:focus': {
                                outline: 'none',
                            }
                            }}
                        >
                            <Typography variant="h6"
                                sx={{
                                    fontWeight: 'normal',
                                }}
                            >
                                Profile
                            </Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
            <UploadPostModal open={open} handleClose={handleClose} />
        </>
    );
}