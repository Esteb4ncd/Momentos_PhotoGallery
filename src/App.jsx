// import React from 'react'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import './App.css'
// import './pages/NavBar'
// import ProfilePage from './pages/ProfilePage';

// function App() {
//   return (
//     <>
//       <NavBar />
//       <ProfilePage />
//     </>
//   )
// }
// export default App;


// const theme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// })


import { useState } from "react"
import SinglePost from "./pages/SinglePost"
import UploadPost from "./pages/UploadPost"
import NavBar from "./pages/NavBar"
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