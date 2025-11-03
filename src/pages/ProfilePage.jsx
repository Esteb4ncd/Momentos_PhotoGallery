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

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
            localStorage.setItem("profilePic", imageUrl);
        }
    };

    // Fetch random dog images
    useEffect(() => {
        const fetchDogs = async () => {
            const urls = [];
            for (let i = 1; i <= 9; i++) {
                const res = await fetch(
                    "https://dog.ceo/api/breeds/image/random"
                );
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

  // When likes update inside modal, refresh photos state with latest post from storage
  useEffect(() => {
    if (!selectedPost) return;
    const latest = getPostById(selectedPost.id);
    if (latest && latest.likes !== selectedPost.likes) {
      setPhotos((prev) => prev.map(p => p.id === latest.id ? latest : p));
      setSelectedPost(latest);
    }
  }, [openPost, selectedPost?.likes]);

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
                <Box sx={{ textAlign: "center" }}>
                    <Avatar
                        alt='User Avatar'
                        src={profilePic}
                        sx={{
                            width: 120,
                            height: 120,
                            margin: "0 auto",
                            mb: 2,
                            cursor: "pointer",
                            transition: "0.3s",
                            "&:hover": { opacity: 0.8 },
                        }}
                        onClick={() => {
                            // restart flow when profile pic clicked again
                            if (!editingPic || editingPic === false)
                                setEditingPic("idle");
                        }}
                    />

                    {editingPic === "idle" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            <Button
                                variant='contained'
                                size='small'
                                component='label'
                            >
                                Change Profile Picture
                                <input
                                    type='file'
                                    accept='image/*'
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl =
                                                URL.createObjectURL(file);
                                            setProfilePic(imageUrl);
                                            setEditingPic("readyToSave");
                                        }
                                    }}
                                />
                            </Button>
                            <span
                                onClick={() => setEditingPic(false)}
                                style={{
                                    color: "grey",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    alignSelf: "center",
                                }}
                            >
                                Cancel
                            </span>
                        </Box>
                    )}

                    {editingPic === "readyToSave" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant='contained'
                                color='success'
                                size='small'
                                onClick={() => {
                                    localStorage.setItem(
                                        "profilePic",
                                        profilePic
                                    );
                                    setEditingPic(false); // close after saving
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                variant='outlined'
                                color='inherit'
                                size='small'
                                onClick={() => {
                                    // cancel resets to idle (start flow again)
                                    setProfilePic(
                                        localStorage.getItem("profilePic")
                                    );
                                    setEditingPic(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        border: "1px solid #c4c4c48e",
                        width: { xs: "90%", sm: "80%" },
                        margin: "16px auto",
                        p: 2,
                        borderRadius: 1,
                    }}
                >
                    {editingBio ?
                        <Box>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "1px",
                                    borderRadius: "4px",
                                }}
                            />
                            <Box sx={{ mt: 1 }}>
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={handleBioSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    size='small'
                                    sx={{ ml: 1 }}
                                    onClick={() => setEditingBio(false)}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    :   <>
                            <Typography variant='body2'>{bio}</Typography>
                            <Button
                                size='small'
                                variant='text'
                                sx={{
                                    mt: 1,
                                    fontSize: "0.60rem",
                                }}
                                onClick={() => setEditingBio(true)}
                            >
                                Edit Bio
                            </Button>
                        </>
                    }
                </Box>

                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                        mt: 1,
                        letterSpacing: 0.5,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                >
                    JOINED SEPT 2025 | {photos.length} PHOTOS |{" "}
                    {photos.reduce((acc, p) => acc + p.likes, 0)} LIKES
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
                                cursor: "pointer",
                            }}
                            onClick={() => handleOpenPost(photo)}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                }}
                            >
                                <CardMedia
                                    component='img'
                                    image={photo.src}
                                    alt={`Photo ${photo.id}`}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
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
                                    <Typography variant='subtitle2'>
                                        {photo.likes}{" "}
                                        {photo.likes === 1 ? "like" : "likes"}
                                    </Typography>

                                    <Box sx={{ textAlign: "right" }}>
                                        <Button
                                            size='small'
                                            variant='outlined'
                                            sx={{
                                                color: "white",
                                                borderColor: "white",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(255,255,255,0.2)",
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
