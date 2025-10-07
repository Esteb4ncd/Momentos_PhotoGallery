import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Avatar,
    Typography,
    Button,
    Card,
    CardMedia,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { samplePhotos } from "../data/samplePhotos";


const mockUsers = {
    "sarahwang": {
        username: "sarahwang",
        bio: "Photography enthusiast capturing life's beautiful moments 📸",
        joined: "January 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        photos: samplePhotos.filter(photo => photo.username === "sarahwang")
    },
    "estebancd": {
        username: "estebancd",
        bio: "Adventure seeker and nature lover 🌲",
        joined: "March 2023",
        pfpUrl: "https://randomuser.me/api/portraits/men/15.jpg",
        photos: samplePhotos.filter(photo => photo.username === "estebancd")
    },
    "emmajarnie": {
        username: "emmajarnie",
        bio: "Artist and creative soul expressing through photography 🎨",
        joined: "June 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        photos: samplePhotos.filter(photo => photo.username === "emmajarnie")
    },
    "kaylaluo": {
        username: "kaylaluo",
        bio: "Tech enthusiast and photography hobbyist 💻📷",
        joined: "September 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/8.jpg",
        photos: samplePhotos.filter(photo => photo.username === "kaylaluo")
    },
    "sarah": {
        username: "sarah",
        bio: "Cat lover and amateur photographer 🐱",
        joined: "February 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        photos: []
    },
    "kayla": {
        username: "kayla",
        bio: "Travel blogger and sunset chaser 🌅",
        joined: "April 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        photos: []
    },
    "emma": {
        username: "emma",
        bio: "Nature enthusiast and outdoor explorer 🌲",
        joined: "May 2023",
        pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg",
        photos: []
    }
};

const UserProfile = ({ onEdit, onPhotoClick }) => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = () => {
            setLoading(true);
            setTimeout(() => {
                const user = mockUsers[username];
                if (user) {
                    setUserData(user);
                } else {
                    // User not found
                    setUserData(null);
                }
                setLoading(false);
            }, 500);
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
        <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ position: "absolute", left: 20, top: 20 }}
        >
            ← Back
        </Button>
                <Typography variant="h6">User not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 }}>
        {/* Back Button */}
        <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ position: "absolute", left: 20, top: 20 }}
        >
            ← Back
        </Button>

        {/* Avatar + Username */}
        <Avatar
            alt="User Avatar"
            src={userData.pfpUrl}
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userData.username}
        </Typography>

        {/* Bio */}
        <Box
            sx={{
            border: "1px solid #c4c4c48e",
            width: "80%",
            margin: "16px auto",
            p: 2,
            borderRadius: 1,
            }}
        >
            <Typography variant="body2">{userData.bio}</Typography>
        </Box>

        {/* Stats */}
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, letterSpacing: 0.5 }}
        >
            JOINED {userData.joined} | {userData.photos.length} PHOTOS |{" "}
            {userData.photos.reduce((acc, p) => acc + (p.likes || 0), 0)} LIKES
        </Typography>

        {/* Photo Grid */}
        <Box
            sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 4,
            gap: 2,
            }}
        >
            {userData.photos.map((photo) => (
            <Box
                key={photo.id}
                sx={{
                position: "relative",
                width: 200,
                height: 200,
                cursor: "pointer",
                }}
                onClick={() => onPhotoClick && onPhotoClick(photo)}
            >
                <Card sx={{ width: "100%", height: "100%" }}>
                <CardMedia
                    component="img"
                    image={photo.src}
                    alt={`Photo ${photo.id}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                </Card>
            </Box>
            ))}
        </Box>
        </Container>
    );
    };

    export default UserProfile;
