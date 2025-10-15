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
import { getCurrentUser } from "../utils/auth";
import { getPostsByUsername, getPostById, deletePostById } from "../utils/posts";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [photos, setPhotos] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  // Get current user on component mount
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Load user's posts from localStorage
  useEffect(() => {
    const user = getCurrentUser();
    const username = user?.fullName ? user.fullName.split(" ")[0].toLowerCase() : "me";
    const posts = getPostsByUsername(username);
    setPhotos(posts);
  }, [currentUser]);

  // If navigated with a newPostId, open it
  useEffect(() => {
    const newPostId = location.state?.newPostId;
    if (newPostId) {
      // Refresh photos so the new post appears in the grid
      const user = getCurrentUser();
      const username = user?.fullName ? user.fullName.split(" ")[0].toLowerCase() : "me";
      const posts = getPostsByUsername(username);
      setPhotos(posts);

      const post = getPostById(newPostId);
      if (post) {
        setSelectedPost(post);
        setOpenPost(true);
      }
    }
  }, [location.state]);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    setOpenPost(true);
  };

  const handleClosePost = () => setOpenPost(false);

  const handleEdit = () => setEditOpen(true);

  const handleDelete = (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    const deleted = deletePostById(postId);
    if (deleted) {
      setPhotos((prev) => prev.filter(p => p.id !== postId));
      if (selectedPost?.id === postId) {
        setOpenPost(false);
        setSelectedPost(null);
      }
    }
  };

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
          {currentUser?.fullName || "Guest User"}
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
          <Typography variant="body2">
            {currentUser?.bio || "No bio yet. Add one to tell others about yourself!"}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, letterSpacing: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          JOINED {currentUser?.joinedDate ? new Date(currentUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'RECENTLY'} | {photos.length} PHOTOS | {photos.reduce((acc, p) => acc + p.likes, 0)} LIKES
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
        onDelete={() => selectedPost && handleDelete(selectedPost.id)}
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
