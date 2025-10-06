import { useState } from "react"
import SinglePost from "./pages/SinglePost"

export default function App() {
  const [open, setOpen] = useState(false)

  const samplePost = {
    username: "Esteban",
    caption: "Sunset at the beach 🌅",
    location: "Bowen Island",
    date: "2025-10-01",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    pfpUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  }

  return (
    <div>
      <h1>Photo Gallery</h1>
      {/* Thumbnail or small preview to open overlay */}
      <img
        src={samplePost.imageUrl}
        alt={samplePost.caption}
        style={{ width: 200, cursor: "pointer" }}
        onClick={() => setOpen(true)}
      />

      <SinglePost
        open={open}
        handleClose={() => setOpen(false)}
        post={samplePost}
      />
    </div>
  )
}
