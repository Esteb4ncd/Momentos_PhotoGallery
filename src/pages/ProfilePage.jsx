import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardMedia,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import OwnSinglePost from "../components/OwnSinglePost";
import OwnSinglePostEdit from "../components/OwnSinglePostEdit";

const ProfilePage = () => {
  const [photos, setPhotos] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // Profile info state
  const [profileImage, setProfileImage] = useState("https://i.ytimg.com/vi/rvX8cS-v2XM/maxresdefault.jpg");
  const [profileName, setProfileName] = useState("Yo Mama");
  const [profileBio, setProfileBio] = useState("Proud dog lover");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const profileSectionRef = useRef(null);

  // Hide button when clicking outside profile section
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEditButton && profileSectionRef.current && !profileSectionRef.current.contains(event.target)) {
        setShowEditButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditButton]);

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    const savedProfileName = localStorage.getItem("profileName");
    const savedProfileBio = localStorage.getItem("profileBio");

    if (savedProfileImage) setProfileImage(savedProfileImage);
    if (savedProfileName) setProfileName(savedProfileName);
    if (savedProfileBio) setProfileBio(savedProfileBio);
  }, []);

  // Logged-in user's profile image (use state instead of constant)
  const loggedInUserPfpUrl = profileImage;

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
          pfpUrl: loggedInUserPfpUrl,
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

  const handleEditProfile = () => {
    setEditImageUrl(profileImage);
    setEditName(profileName);
    setEditBio(profileBio);
    setIsEditingProfile(true);
    setShowEditButton(false);
  };

  const handleSaveProfile = () => {
    setProfileImage(editImageUrl);
    setProfileName(editName);
    setProfileBio(editBio);
    
    // Save to localStorage
    localStorage.setItem("profileImage", editImageUrl);
    localStorage.setItem("profileName", editName);
    localStorage.setItem("profileBio", editBio);
    
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setShowEditButton(false);
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Use FileReader to convert file to data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 6 , mt: 10, mb: 4}}>
        <Box ref={profileSectionRef}>
        <Avatar
          alt="User Avatar"
          src={profileImage}
          onClick={() => setShowEditButton(true)}
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            mb: 2,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        />
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "bold", 
            mb: 1,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => setShowEditButton(true)}
        >
          {profileName}
        </Typography>

        <Box
          onClick={() => setShowEditButton(true)}
          sx={{
            border: "1px solid #c4c4c48e",
            width: { xs: "90%", sm: "80%" },
            margin: "16px auto",
            p: 2,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              borderColor: "#4f40b4",
              backgroundColor: "rgba(79, 64, 180, 0.05)",
            },
          }}
        >
          <Typography variant="body2">{profileBio}</Typography>
        </Box>

        {showEditButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditProfile}
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#4f40b4",
              "&:hover": {
                backgroundColor: "#3d2f9e",
              },
              animation: "fadeIn 0.3s ease-in",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Edit Profile
          </Button>
        )}
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
        profileImage={profileImage}
      />

      <OwnSinglePostEdit
        open={editOpen}
        handleClose={handleCloseEdit}
        post={selectedPost}
        onSave={handleSaveEdit}
        profileImage={profileImage}
      />

      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            {/* Profile Image Upload */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
                Profile Image
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderColor: "#4f40b4",
                  color: "#4f40b4",
                  "&:hover": {
                    borderColor: "#3d2f9e",
                    backgroundColor: "rgba(79, 64, 180, 0.1)",
                  },
                }}
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
              
              <TextField
                label="Or enter image URL"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                fullWidth
                placeholder="Paste an image URL"
                helperText="Upload a photo or paste an image URL"
                size="small"
              />
            </Box>
            
            {/* Preview */}
            {editImageUrl && (
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={editImageUrl}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  Preview
                </Typography>
              </Box>
            )}

            {/* Name */}
            <TextField
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              placeholder="Enter your name"
            />

            {/* Bio */}
            <TextField
              label="Bio"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Tell us about yourself"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;
