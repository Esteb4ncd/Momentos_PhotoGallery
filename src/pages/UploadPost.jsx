import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function UploadPost() {
    return (
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row", gap: 4, mb: 2, alignItems: "center" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "row", gap: 0, alignItems: "flex-start", p: 3, boxSizing: "border-box", borderRadius: 2, backgroundColor: "lightgray", height: 425 }}>
                {/* Username box to left side */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", p: 3, boxSizing: "border-box", borderRadius: 2, backgroundColor: "lightgray"  }}>
                    <Typography variant="h6">Username</Typography>
                </Box>

                {/* Caption box to right side */}
                <Box sx={{ flex: 1, p: 2, boxSizing: "border-box", borderRadius: 2, backgroundColor: "lightgray", display: "flex", flexDirection: "column" }}>
                    <TextField 
                    multiline 
                    placeholder='Type Caption Here' 
                    rows={12}
                    sx={{ ml: 2, width: 350 }}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 1, p: 3, boxSizing: "border-box", borderRadius: 2, backgroundColor: "lightgray", height: 425 }}>
                <Box sx={{ mb: 2, gap: 2 }}> 
                    <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
                        alt="Preview" 
                        style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} 
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" sx={{ mt: 2, gap: 2 }}>
                        Post
                    </Button>
                </Box>
            </Box>
        </ Container>

    )
}