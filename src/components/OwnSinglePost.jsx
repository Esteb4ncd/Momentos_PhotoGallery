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
import { useState } from "react";
import { addCommentToPost, toggleLikeForUser } from "../utils/posts";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function OwnSinglePost({ open, handleClose, post, onEdit, profileImage }) {
  if (!post) return null;

  // Logged-in user's profile image (from props or localStorage)
  const loggedInUserPfpUrl = profileImage || localStorage.getItem("profileImage") || "https://i.ytimg.com/vi/rvX8cS-v2XM/maxresdefault.jpg";

  const navigate = useNavigate();
  const currentUser = getCurrentUser() || { id: 'guest' };
  const [liked, setLiked] = useState(Array.isArray(post.likedBy) ? post.likedBy.includes(currentUser.id) : false);
  const [likeCount, setLikeCount] = useState(post.likes || (Array.isArray(post.likedBy) ? post.likedBy.length : 0));
  const [commentLikes, setCommentLikes] = useState({});
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  
  // Get logged-in user's info
  const loggedInUserName = localStorage.getItem("profileName") || "Me";
  const loggedInUserPfp = profileImage || localStorage.getItem("profileImage") || "https://i.ytimg.com/vi/rvX8cS-v2XM/maxresdefault.jpg";

  const handleUsernameClick = (username) => {
    navigate(`/user/${username}`);
    handleClose(); // Close the modal when navigating
  };

  const handleLike = () => {
    const updated = toggleLikeForUser(post.id, currentUser.id);
    if (updated) {
      setLikeCount(updated.likes || 0);
      const hasLiked = Array.isArray(updated.likedBy) && updated.likedBy.includes(currentUser.id);
      setLiked(hasLiked);
    }
  };

  const handleCommentLike = (id) => {
    setCommentLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        username: loggedInUserName,
        pfpUrl: loggedInUserPfp,
        text: newComment.trim(),
      };
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      setNewComment("");
      
      // Update post with new comment
      if (post) {
        post.comments = updatedComments;
      }
      
      // Save to localStorage if this is a saved post
      const savedPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
      const postIndex = savedPosts.findIndex(p => p.id === post.id);
      if (postIndex !== -1) {
        savedPosts[postIndex].comments = updatedComments;
        localStorage.setItem("userPosts", JSON.stringify(savedPosts));
      }
    }
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullScreen={{ xs: true, sm: true, md: false }}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "100%", md: "80vw" },
          maxWidth: { xs: "100%", sm: "100%", md: "1000px" },
          borderRadius: { xs: 0, sm: 0, md: 3 },
          maxHeight: { xs: "100vh", sm: "100vh", md: "90vh" },
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      {/* Top-right: Close + Edit button */}
      <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1, zIndex: 2 }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onEdit}
          sx={{
            backgroundColor: "#4f40b4",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { 
              backgroundColor: "#3d2f9e",
            },
            fontSize: { xs: '0.7rem', md: '0.875rem' },
            px: { xs: 1.5, md: 2.5 },
            py: { xs: 0.5, md: 0.75 }
          }}
        >
          Edit
        </Button>

        {onDelete && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onDelete}
            sx={{
              "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
              fontSize: { xs: '0.7rem', md: '0.875rem' },
              px: { xs: 1, md: 2 }
            }}
          >
            Delete
          </Button>
        )}
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          p: 0,
          boxSizing: "border-box",
          overflow: "hidden",
          width: "100%",
          height: { xs: "100vh", md: "70vh" },
        }}
      >
        {/* Left Side: Info + Comments */}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={loggedInUserPfpUrl} sx={{ mr: 1 }} />
              <Typography 
                variant="h6" 
                sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                onClick={() => handleUsernameClick(post.username)}
              >
                {post.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {post.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton 
                onClick={handleLike} 
                color={liked ? "error" : "default"}
                sx={{
                  width: 40,
                  height: 40,
                  "& .MuiTouchRipple-root": {
                    borderRadius: "50%",
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>
              <Typography sx={{ ml: 1 }}>
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </Typography>
            </Box>
          </Box>

          {/* Caption */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            {post.caption}
          </Typography>

          {/* Date */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            {post.date}
          </Typography>

          {/* Comments */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {comments.map((comment) => (
              <Box key={comment.id} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar src={comment.pfpUrl} sx={{ mr: 1, width: 30, height: 30 }} />
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                      onClick={() => handleUsernameClick(comment.username.toLowerCase())}
                    >
                      {comment.username}
                    </Typography>
                    <Typography variant="body2">{comment.text}</Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleCommentLike(comment.id)}
                  color={commentLikes[comment.id] ? "error" : "default"}
                  sx={{
                    "& .MuiTouchRipple-root": {
                      borderRadius: "50%",
                    },
                  }}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Add Comment Input */}
          <Box sx={{ display: "flex", width: "100%", gap: 1, mt: 2 }}>
            <TextField 
              variant="outlined" 
              size="small" 
              placeholder="Add a comment..." 
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleCommentKeyPress}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{
                color: "#fff",
                "&:hover": { bgcolor: "#3f3da0" },
                "&:disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                  color: "rgba(0, 0, 0, 0.26)",
                },
              }}
            >
              Post
            </Button>
          </Box>
        </Box>

        {/* Right Side: Image */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            minHeight: { xs: "40vh", md: "auto" },
          }}
        >
          <img
            src={post.imageUrl || post.src}
            alt={post.caption || "Post image"}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={(e) => {
              console.error("Failed to load image:", post.imageUrl || post.src);
              e.target.style.display = "none";
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
