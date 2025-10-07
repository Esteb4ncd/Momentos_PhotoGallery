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

export default function UploadPost({ handleClose }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const fileInputRef = React.useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
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
              src="https://randomuser.me/api/portraits/men/14.jpg"
              sx={{ mr: { xs: 1, md: 2 }, width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Username
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
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 1, md: 1.2 },
            borderRadius: 5,
            fontWeight: "bold",
            color: "#fff",
            fontSize: { xs: '0.875rem', md: '1rem' },
            "&:hover": { bgcolor: "#3f3da0" },
          }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
}
