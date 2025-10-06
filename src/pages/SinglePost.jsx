import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useState } from "react"

export default function SinglePost({ open, handleClose, post }) {

  if (!post) return null

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)

  const [commentLikes, setCommentLikes] = useState({}) // track likes per comment

  const comments = [
    { id: 1, username: "Sarah", pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg", text: "Beautiful shot!" },
    { id: 2, username: "Kayla", pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg", text: "Love the colors 🌅" },
    { id: 3, username: "Emma", pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg", text: "Amazing view!" },
    { id: 1, username: "Sarah", pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg", text: "Beautiful shot!" },
    { id: 2, username: "Kayla", pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg", text: "Love the colors 🌅" },
    { id: 3, username: "Emma", pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg", text: "Amazing view!" },
    { id: 1, username: "Sarah", pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg", text: "Beautiful shot!" },
    { id: 2, username: "Kayla", pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg", text: "Love the colors 🌅" },
    { id: 3, username: "Emma", pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg", text: "Amazing view!" },
  ]

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleCommentLike = (id) => {
    setCommentLikes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "60vw",
          maxWidth: "800px",
          borderRadius: 3,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          boxSizing: "border-box",
          overflowX: "hidden",
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 0,
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* Image */}
        <Box sx={{ width: "100%", bgcolor: "black", boxSizing: "border-box" }}>
          <img
            src={post.imageUrl}
            alt={post.caption}
            style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Post Info */}
        <Box sx={{ width: "100%", p: 3, boxSizing: "border-box" }}>
          {/* Username + Like Button Row */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={post.pfpUrl} sx={{ mr: 1 }} />
              <Typography variant="h6">{post.username}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {post.location}
              </Typography>
            </Box>
            {/* Like Button */}
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
          <Typography variant="body1" sx={{ mb: 1 }}>
            {post.caption}
          </Typography>

          {/* Date */}
          <Typography variant="caption" color="text.secondary">
            {post.date}
          </Typography>
        </Box>

        {/* Comments Section */}
        <Box
          sx={{
            width: "100%",
            px: 3,
            pb: 3,
            flexGrow: 1,
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{ display: "flex", alignItems: "flex-start", mb: 2, justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar src={comment.pfpUrl} sx={{ mr: 1, width: 30, height: 30 }} />
                <Box>
                  <Typography variant="subtitle2">{comment.username}</Typography>
                  <Typography variant="body2">{comment.text}</Typography>
                </Box>
              </Box>
              {/* Mini Like Button */}
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
        <Box sx={{ display: "flex", width: "100%", p: 3, boxSizing: "border-box", gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Add a comment..."
            fullWidth
          />
          <Button variant="contained">Post</Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
