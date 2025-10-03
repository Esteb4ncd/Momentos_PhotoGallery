import { useState } from "react"
import SinglePost from "./pages/SinglePost"
import UploadPost from "./pages/UploadPost"
import NavBar from "./pages/NavBar"

export default function App() {


  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <UploadPost />
      </main>
    </div>
  )
}