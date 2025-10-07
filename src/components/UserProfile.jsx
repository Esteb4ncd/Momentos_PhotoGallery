import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { samplePhotos } from "../data/samplePhotos";
import SinglePost from "./SinglePost";
import FavoriteIcon from "@mui/icons-material/Favorite";

const mockUsers = {
  sarahwang: {
    username: "sarahwang",
    bio: "Photography enthusiast capturing life's beautiful moments 📸",
    joined: "January 2023",
    pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    photos: samplePhotos.filter((photo) => photo.username === "sarahwang"),
  },
  estebancd: {
    username: "estebancd",
    bio: "Adventure seeker and nature lover 🌲",
    joined: "March 2023",
    pfpUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    photos: samplePhotos.filter((photo) => photo.username === "estebancd"),
  },
  emmajarnie: {
    username: "emmajarnie",
    bio: "Artist and creative soul expressing through photography 🎨",
    joined: "June 2023",
    pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    photos: samplePhotos.filter((photo) => photo.username === "emmajarnie"),
  },
  kaylaluo: {
    username: "kaylaluo",
    bio: "Tech enthusiast and photography hobbyist 💻📷",
    joined: "September 2023",
    pfpUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    photos: samplePhotos.filter((photo) => photo.username === "kaylaluo"),
  },
};

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPost, setOpenPost] = useState(false);

  const handlePhotoClick = (photo) => {
    setSelectedPost(photo);
    setOpenPost(true);
  };

  const handleClosePost = () => {
    setOpenPost(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchUserData = () => {
      setLoading(true);
      setTimeout(() => {
        const user = mockUsers[username];
        setUserData(user || null);
        setLoading(false);
      }, 500);
    };

    if (username) fetchUserData();
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
        <Typography variant="h6">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      {/* Profile Info */}
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
        sx={{
          mt: 1,
          letterSpacing: 0.5,
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
        }}
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
          alignItems: "center",
          mt: 4,
          gap: 2,
          mx: "auto",
        }}
      >
        {userData.photos.map((photo) => (
          <Box
            key={photo.id}
            sx={{
              position: "relative",
              width: { xs: 150, sm: 180, md: 200 },
              height: { xs: 150, sm: 180, md: 200 },
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: 2,
              "&:hover .hoverOverlay": { opacity: 1 },
            }}
            onClick={() => handlePhotoClick(photo)}
          >
            <Card sx={{ width: "100%", height: "100%" }}>
              <CardMedia
                component="img"
                image={photo.src}
                alt={`Photo ${photo.id}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Card>

            {/* Hover overlay showing likes */}
            <Box
              className="hoverOverlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                opacity: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "opacity 0.3s ease",
                fontSize: "1rem",
                gap: 1,
              }}
            >
              <FavoriteIcon sx={{ fontSize: 20, color: "white" }} />
              <Typography sx={{ fontWeight: "bold" }}>
                {photo.likes || 0}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* SinglePost Modal */}
      {selectedPost && (
        <SinglePost
          open={openPost}
          handleClose={handleClosePost}
          post={selectedPost}
        />
      )}
    </Container>
  );
};

export default UserProfile;
