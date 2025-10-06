import { useState } from "react"
import SinglePost from "./pages/SinglePost"
import UploadPost from "./components/UploadPost"
import NavBar from "./components/NavBar"
import Gallery from "./pages/Gallery"

export default function App() {


  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Gallery/>
      </main>
    </div>
  )
}