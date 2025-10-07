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
import OwnSinglePost from "../components/OwnSinglePost";
import OwnSinglePostEdit from "../components/OwnSinglePostEdit";

const ProfilePage = () => {
  const [photos, setPhotos] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // Fetch random dog images
  useEffect(() => {
    const fetchDogs = async () => {
      const urls = [];
      for (let i = 1; i <= 9; i++) {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        urls.push({
          id: i,
          src: data.message,
          username: "Me",
          pfpUrl: `https://randomuser.me/api/portraits/men/${10 + i}.jpg`,
          caption: `Cute dog ${i}`,
          date: `Oct ${10 - i}, 2025`,
          location: "Toronto",
          likes: Math.floor(Math.random() * 10),
        });
      }
      setPhotos(urls);
    };
    fetchDogs();
  }, []);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    setOpenPost(true);
  };

  const handleClosePost = () => setOpenPost(false);

  const handleEdit = () => setEditOpen(true);

  const handleCloseEdit = () => setEditOpen(false);

  const handleSaveEdit = (updatedPost) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setSelectedPost(updatedPost);
    handleCloseEdit();
  };

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 , mt: 10, mb: 4}}>
      <Avatar
  alt="User Avatar"
  src="https://i.ytimg.com/vi/rvX8cS-v2XM/maxresdefault.jpg"
  sx={{
    width: 120,
    height: 120,
    margin: "0 auto",
    mb: 2,
  }}
/>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Yo Mama
        </Typography>

        <Box
          sx={{
            border: "1px solid #c4c4c48e",
            width: { xs: "90%", sm: "80%" },
            margin: "16px auto",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">Proud dog lover </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, letterSpacing: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          JOINED SEPT 2025 | {photos.length} PHOTOS | {photos.reduce((acc, p) => acc + p.likes, 0)} LIKES
        </Typography>

        {/* Responsive Photo Grid */}
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
          {photos.map((photo) => (
            <Box
              key={photo.id}
              sx={{ 
                position: "relative", 
                width: { xs: 150, sm: 180, md: 200 }, 
                height: { xs: 150, sm: 180, md: 200 }, 
                cursor: "pointer" 
              }}
              onClick={() => handleOpenPost(photo)}
            >
              <Card sx={{ width: "100%", height: "100%", position: "relative" }}>
                <CardMedia
                  component="img"
                  image={photo.src}
                  alt={`Photo ${photo.id}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Hover Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 1,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": { opacity: 1 },
                  }}
                  onClick={() => handleOpenPost(photo)}
                >
                  <Typography variant="subtitle2">
                    {photo.likes} {photo.likes === 1 ? "like" : "likes"}
                  </Typography>

                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.2)",
                          borderColor: "white",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(photo);
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      <OwnSinglePost
        open={openPost}
        handleClose={handleClosePost}
        post={selectedPost}
        onEdit={handleEdit}
      />

      <OwnSinglePostEdit
        open={editOpen}
        handleClose={handleCloseEdit}
        post={selectedPost}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default ProfilePage;
