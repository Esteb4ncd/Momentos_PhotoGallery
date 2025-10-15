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
import { addCommentToPost, setPostLikes } from "../utils/posts";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function OwnSinglePost({ open, handleClose, post, onEdit, onDelete }) {
  if (!post) return null;

  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [commentLikes, setCommentLikes] = useState({});

  const handleUsernameClick = (username) => {
    navigate(`/user/${username}`);
    handleClose(); // Close the modal when navigating
  };

  const [commentInput, setCommentInput] = useState("");
  const [commentsState, setCommentsState] = useState(post.comments || []);

  const handleLike = () => {
    const next = liked ? likeCount - 1 : likeCount + 1;
    const updated = setPostLikes(post.id, next);
    if (updated) {
      setLikeCount(updated.likes || 0);
      setLiked(!liked);
    }
  };

  const handleCommentLike = (id) => {
    setCommentLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={{ xs: true, sm: true, md: false }}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 0, md: 3 },
          maxHeight: { xs: "100vh", sm: "100vh", md: "90vh" },
          display: "flex",
          flexDirection: "column",
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
          variant="outlined"
          size="small"
          color="primary"
          onClick={onEdit}
          sx={{
            "&:hover": { backgroundColor: "rgba(79, 64, 180, 0.1)" },
            fontSize: { xs: '0.7rem', md: '0.875rem' },
            px: { xs: 1, md: 2 }
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
              <Avatar src={post.pfpUrl} sx={{ mr: 1 }} />
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
              <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
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
            {commentsState.map((comment) => (
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
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (commentInput.trim()) {
                    const user = getCurrentUser() || { fullName: 'Me' };
                    const username = user?.fullName ? user.fullName.split(' ')[0] : 'Me';
                    const updated = addCommentToPost(post.id, {
                      username,
                      pfpUrl: post.pfpUrl,
                      text: commentInput.trim(),
                    });
                    if (updated) {
                      setCommentsState(updated.comments || []);
                      setCommentInput("");
                    }
                  }
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "#fff",
                "&:hover": { bgcolor: "#3f3da0" },
              }}
              disabled={!commentInput.trim()}
              onClick={() => {
                if (!commentInput.trim()) return;
                const user = getCurrentUser() || { fullName: 'Me' };
                const username = user?.fullName ? user.fullName.split(' ')[0] : 'Me';
                const updated = addCommentToPost(post.id, {
                  username,
                  pfpUrl: post.pfpUrl,
                  text: commentInput.trim(),
                });
                if (updated) {
                  setCommentsState(updated.comments || []);
                  setCommentInput("");
                }
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
