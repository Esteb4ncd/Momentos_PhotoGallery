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

  const fixedWidth = 900; // fixed container width
  const uploadAreaHeight = 400; // fixed upload box height

  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        bgcolor: "background.paper",
        p: 0,
        width: fixedWidth,
        maxWidth: "100%",
        minWidth: fixedWidth,
        height: uploadAreaHeight,
      }}
    >
      {/* LEFT: Info + Inputs */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 4,
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
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="https://randomuser.me/api/portraits/men/14.jpg"
              sx={{ mr: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
          sx={{ mb: 1, fontWeight: 500 }}
        >
          Caption
        </Typography>
        <TextField
          multiline
          placeholder="Write your caption..."
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {/* Location Field as Text Input */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          Location
        </Typography>
        <TextField
          placeholder="Add location..."
          fullWidth
          size="small"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
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
          height: "100%", // fixed height
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
              p: 4,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 60, mb: 2, color: "gray" }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Click to Upload Image
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
          bottom: 20,
          right: 20,
        }}
      >
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 5,
            fontWeight: "bold",
            bgcolor: "#4F4DB4",
            color: "#fff",
            "&:hover": { bgcolor: "#3f3da0" },
          }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
}
