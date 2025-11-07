import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  //   base: '/Momentos_PhotoGallery/',
  base: process.env.NODE_ENV === 'production' ? '/Momentos_PhotoGallery/' : '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
