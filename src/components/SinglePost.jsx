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
import { useNavigate } from "react-router-dom";
import { getUserProfileImage, getFallbackImage } from "../utils/randomUsers";

export default function SinglePost({ open, handleClose, post }) {
  if (!post) return null;

  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [commentLikes, setCommentLikes] = useState({});
  const [comments, setComments] = useState(() => {
    // Use post.comments if available, otherwise use default comments
    if (post.comments && post.comments.length > 0) {
      return post.comments;
    }
    return [
      { id: 1, username: "Sarah", pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg", text: "Beautiful shot!" },
      { id: 2, username: "Kayla", pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg", text: "Love the colors 🌅" },
      { id: 3, username: "Emma", pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg", text: "Amazing view!" },
    ];
  });
  const [newComment, setNewComment] = useState("");
  
  // Get logged-in user's info (for commenting)
  const loggedInUserName = localStorage.getItem("profileName") || "Guest";
  const loggedInUserPfp = localStorage.getItem("profileImage") || "https://randomuser.me/api/portraits/women/10.jpg";

  // Get profile picture using the same function as UserProfile to ensure consistency
  const getProfilePicture = (username) => {
    // Use the pfpUrl from the post if available (from samplePhotos)
    if (post.pfpUrl) {
      return post.pfpUrl;
    }
    // Otherwise, use getUserProfileImage which generates deterministic images
    return getUserProfileImage(username);
  };

  const handleUsernameClick = (username) => {
    navigate(`/user/${username}`);
    handleClose(); // Close the modal when navigating
  };

  const handleLike = () => {
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setLiked(!liked);
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
      <IconButton 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (handleClose) {
            handleClose();
          }
        }} 
        sx={{ position: "absolute", top: 16, right: 16, zIndex: 1, color: "white" }}
      >
        <CloseIcon />
      </IconButton>

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
            p: { xs: 2, sm: 2.5, md: 3 },
            overflowY: "auto",
            bgcolor: "background.paper",
          }}
        >
          {/* Username + Like */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <Avatar 
                src={getProfilePicture(post.username)} 
                sx={{ mr: 1, width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
                onError={(e) => {
                  const gender = post.username.includes('esteban') ? 'male' : 'female';
                  e.target.src = getFallbackImage(gender, post.username);
                }}
              />
              <Typography 
                variant="h6" 
                sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" }, fontSize: { xs: '1rem', md: '1.25rem' } }}
                onClick={() => handleUsernameClick(post.username)}
              >
                {post.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
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
          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>{post.caption}</Typography>

          {/* Date */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>{post.date}</Typography>

          {/* Comments */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
            {comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{ display: "flex", alignItems: "flex-start", mb: 2, justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar 
                    src={comment.pfpUrl} 
                    sx={{ mr: 1, width: { xs: 24, md: 30 }, height: { xs: 24, md: 30 } }}
                    onError={(e) => {
                      const gender = comment.username.toLowerCase().includes('esteban') ? 'male' : 'female';
                      e.target.src = getFallbackImage(gender);
                    }}
                  />
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" }, fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                      onClick={() => handleUsernameClick(comment.username)}
                    >
                      {comment.username}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>{comment.text}</Typography>
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
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: { xs: '0.8rem', md: '0.875rem' }
                }
              }}
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
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                px: { xs: 2, md: 3 }
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
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            minHeight: { xs: "40vh", md: "auto" },
          }}
        >
          <img
            src={post.imageUrl || post.src}
            alt={post.caption}
            onError={(e) => {
              // Fallback to a placeholder image if the image fails to load
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
            }}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}