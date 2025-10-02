import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"

export default function SinglePost({ open, handleClose, post }) {
  if (!post) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "row",
          borderRadius: 3,
          overflow: "hidden",
          height: { xs: "80vh", md: "60vh" },
        },
      }}
    >
      {/* Left side: Info */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
          bgcolor: "background.paper",
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={post.pfpUrl} sx={{ mr: 1 }} />
          <Typography variant="h6">{post.username}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            {post.location}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.caption}
        </Typography>

        <Typography variant="caption" color="text.secondary"
          sx={{ position: "absolute", bottom: 16 , right: 16}}>
          {post.date}
        </Typography>
      </Box>

      {/* Right side: Image */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "black",
        }}
      >
        <img
          src={post.imageUrl}
          alt={post.caption}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
                <IconButton
          onClick={handleClose}
          sx={{ 
            position: "absolute",
            top: 16,
            right: 16,
           color: "white"}}
        >
          <CloseIcon />
        </IconButton>

      </Box>
    </Dialog>
  )
}
