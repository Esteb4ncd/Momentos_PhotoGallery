
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Avatar,
    Grid,
    Card,
    CardMedia,
} from "@mui/material";

import PhotoGrid from "../components/ProfileGrid";


const ProfilePage = () => {
    const photos = [
        { id: 1, src: "https://via.placeholder.com/300" },
        { id: 2, src: "https://via.placeholder.com/300" },
        { id: 3, src: "https://via.placeholder.com/300" },
        { id: 4, src: "https://via.placeholder.com/300" },
        { id: 5, src: "https://via.placeholder.com/300" },
    ];

    return (
        <>
        {/* 📄 Main Profile Section */}
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
            <Avatar
            alt="User Avatar"
            sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                mb: 2,
                bgcolor: "#ccc",
            }}
            />


            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            CEO OF MOMENTOS
            </Typography>


            <Box
            sx={{
                border: "1px solid #c4c4c48e",
                width: "80%",
                margin: "16px auto",
                p: 2,
                borderRadius: 1,
            }}
            >
            <Typography variant="body2">SHORT BIO</Typography>
            </Box>

            <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, letterSpacing: 0.5 }}
            >
            JOINED SEPT 2025 | 12 PHOTOS | 58 LIKES
            </Typography>




            <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
            {/* Profile header stuff */}
            <PhotoGrid photos={photos} cols={3} variant="woven" gap={8} />
            </Container>;







            {/* 🖼️ Photo Grid */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card
                    sx={{
                    boxShadow: "none",
                    bgcolor: "#e0e0e0",
                    height: 200,
                    }}
                >
                    <CardMedia
                    component="img"
                    image={photo.src}
                    alt={`Photo ${photo.id}`}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    />
                </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
        </>
    );
};

export default ProfilePage;



