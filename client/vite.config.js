import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   '/': import.meta.env.VITE_URL
  // },
  plugins: [react()],
})
