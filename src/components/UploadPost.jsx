import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Container,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { addPost } from "../utils/posts";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function UploadPost({ handleClose }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImageFile, setSelectedImageFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [imageError, setImageError] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  // Get current user's profile image and name
  const currentUser = getCurrentUser();
  const profileImage = localStorage.getItem("profileImage") || "https://i.ytimg.com/vi/rvX8cS-v2XM/maxresdefault.jpg";
  const profileName = localStorage.getItem("profileName") || currentUser?.fullName || "Me";

  const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            } else {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageError('Please select a valid image file (PNG, JPG, JPEG)');
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        setImageError('Image size must be less than 10MB. Please choose a smaller image.');
        return;
      }
      
      setImageError(null);
      setError(null);
      setSelectedImageFile(file);
      try {
        // Compress image to reduce storage size
        const compressedDataUrl = await compressImage(file);
        setSelectedImage(compressedDataUrl);
      } catch (error) {
        console.error("Error processing image:", error);
        setImageError('Failed to process image. Please try a different image.');
        // Fallback to original if compression fails
        try {
          setSelectedImage(URL.createObjectURL(file));
        } catch (fallbackError) {
          setImageError('Unable to load image. Please try again.');
        }
      }
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const user = getCurrentUser() || { fullName: "Me", id: "guest" };
      const username = user?.fullName ? user.fullName.split(" ")[0].toLowerCase() : "me";
      // Use the current user's profile image
      const pfpUrl = profileImage;
      
      // Create the post
      const newPost = addPost({
        username,
        pfpUrl,
        caption: caption || "",
        location: location || "",
        imageDataUrl: selectedImage,
      });
      
      // Close the modal first
      if (handleClose) {
        handleClose();
      }
      
      // Small delay to ensure modal closes
      setTimeout(() => {
        navigate("/profilepage", { state: { newPostId: newPost.id } });
      }, 100);
      
    } catch (error) {
      console.error("Error posting:", error);
      setIsSubmitting(false);
      
      // Handle specific error types
      let errorMessage = "Failed to post. Please try again.";
      if (error.message) {
        if (error.message.includes("Storage quota exceeded") || error.message.includes("QuotaExceededError")) {
          errorMessage = "Storage quota exceeded. Please delete some posts or clear your browser data to continue.";
        } else if (error.message.includes("Image data is required")) {
          errorMessage = "Image data is required. Please select an image.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
    }
  };

  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        borderRadius: { xs: 0, sm: 2, md: 3 },
        overflow: "hidden",
        boxShadow: 4,
        bgcolor: "background.paper",
        p: 0,
        width: { xs: "100%", sm: "90%", md: 900 },
        maxWidth: "100%",
        minWidth: { xs: "100%", md: 900 },
        height: { xs: "100vh", md: 400 },
      }}
    >
      {/* LEFT: Info + Inputs */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3, md: 4 },
          overflowY: "auto",
          bgcolor: "background.paper",
        }}
      >
        {/* Header with Username + Close */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={profileImage}
              sx={{ mr: { xs: 1, md: 2 }, width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {profileName}
            </Typography>
          </Box>
          {handleClose && (
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Caption Field */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.875rem' } }}
        >
          Caption
        </Typography>
        <TextField
          multiline
          placeholder="Write your caption..."
          rows={4}
          fullWidth
          variant="outlined"
          color="primary"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{
            mb: { xs: 2, md: 3 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: '0.875rem', md: '1rem' }
            }
          }}
        />

        {/* Location Field as Text Input */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.875rem' } }}
        >
          Location
        </Typography>
        <TextField
          placeholder="Add location..."
          fullWidth
          size="small"
          variant="outlined"
          color="primary"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            mb: { xs: 2, md: 3 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: '0.875rem', md: '1rem' }
            }
          }}
        />
        
        {/* Error Messages */}
        {error && (
          <Typography
            variant="body2"
            sx={{
              color: "#f44336",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              p: 1.5,
              backgroundColor: "#ffebee",
              borderRadius: "5px",
              border: "1px solid #f44336",
              fontSize: { xs: '0.8rem', md: '0.875rem' }
            }}
          >
            {error}
          </Typography>
        )}
        
        {imageError && (
          <Typography
            variant="body2"
            sx={{
              color: "#f44336",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              p: 1.5,
              backgroundColor: "#ffebee",
              borderRadius: "5px",
              border: "1px solid #f44336",
              fontSize: { xs: '0.8rem', md: '0.875rem' }
            }}
          >
            {imageError}
          </Typography>
        )}
      </Box>

      {/* RIGHT: Upload Area */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#3a3a3a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          height: { xs: "50vh", md: "100%" },
          minHeight: { xs: "300px", md: "auto" },
          "&:hover .upload-overlay": {
            opacity: 1,
          },
        }}
        onClick={handleAreaClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              color: "white",
              textAlign: "center",
              p: { xs: 2, md: 4 },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: { xs: 40, md: 60 }, mb: 2, color: "gray" }} />
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Click to Upload Image
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              PNG, JPG, JPEG — up to 10MB
            </Typography>
            {imageError && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "#f44336", 
                  fontWeight: "bold",
                  display: "block",
                  mt: 1,
                  fontSize: { xs: '0.7rem', md: '0.75rem' }
                }}
              >
                {imageError}
              </Typography>
            )}
          </Box>
        )}

        {selectedImage && (
          <Box
            className="upload-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography variant="body1">Click to change image</Typography>
          </Box>
        )}
      </Box>

      {/* OUTER: Post Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 10, md: 20 },
          right: { xs: 10, md: 20 },
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedImage || isSubmitting}
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 1, md: 1.2 },
            borderRadius: 5,
            fontWeight: "bold",
            color: "#fff",
            fontSize: { xs: '0.875rem', md: '1rem' },
            "&:hover": { bgcolor: "#3f3da0" },
            "&:disabled": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              color: "rgba(0, 0, 0, 0.26)",
            },
            pointerEvents: "auto",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePost();
          }}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Container>
  );
}
