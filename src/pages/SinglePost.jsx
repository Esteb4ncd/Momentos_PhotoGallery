import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function SinglePost({ open, handleClose, post }) {
  if (!post) return null

  const comments = [
    { username: "Sarah", pfpUrl: "https://randomuser.me/api/portraits/women/10.jpg", text: "Beautiful shot!" },
    { username: "Kayla", pfpUrl: "https://randomuser.me/api/portraits/women/12.jpg", text: "Love the colors 🌅" },
    { username: "Emma", pfpUrl: "https://randomuser.me/api/portraits/women/15.jpg", text: "Amazing view!" },
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false} // allow custom width
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
          overflowX: "hidden", // prevent horizontal scroll
        },
      }}
    >
      {/* Close button */}
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
            style={{ width: "100%", maxHeight: "20%", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Post Info */}
        <Box sx={{ width: "100%", p: 3, boxSizing: "border-box" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={post.pfpUrl} sx={{ mr: 1 }} />
            <Typography variant="h6">{post.username}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {post.location}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 1 }}>
            {post.caption}
          </Typography>

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
          {comments.map((comment, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <Avatar src={comment.pfpUrl} sx={{ mr: 1, width: 30, height: 30 }} />
              <Box>
                <Typography variant="subtitle2">{comment.username}</Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Box>
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
