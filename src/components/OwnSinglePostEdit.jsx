import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function OwnSinglePostEdit({ open, handleClose, post, onSave }) {
  if (!post) return null;

  const [caption, setCaption] = useState(post.caption);
  const [location, setLocation] = useState(post.location);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = () => {
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setLiked(!liked);
  };

  const handleSave = () => {
    const updatedPost = { ...post, caption, location };
    onSave(updatedPost);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "80vw",
          maxWidth: "1000px",
          borderRadius: 3,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          overflow: "hidden",
        },
      }}
    >
      {/* Top-right Close */}
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: 0,
          width: "100%",
          height: "70vh",
        }}
      >
        {/* Left Side: Info + Edit */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
            overflowY: "auto",
            bgcolor: "background.paper",
          }}
        >
          {/* Username + Like */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={post.pfpUrl} sx={{ mr: 1 }} />
              <Typography variant="h6">{post.username}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
                <FavoriteIcon />
              </IconButton>
              <Typography sx={{ ml: 1 }}>
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </Typography>
            </Box>
          </Box>

          {/* Editable Caption */}
          <TextField
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            multiline
            rows={3}
            color="primary"
            sx={{ mb: 2 }}
          />

          {/* Editable Location */}
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            color="primary"
            sx={{ mb: 2 }}
          />

          {/* Date */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            {post.date}
          </Typography>

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
                position: "absolute",
                bottom: 20,
                width: "48%",
              color: "#fff",
              "&:hover": { backgroundColor: "#3f3da0" },
            }}
          >
            Save Changes
          </Button>
        </Box>

        {/* Right Side: Image */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={post.imageUrl || post.src}
            alt={post.caption}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
