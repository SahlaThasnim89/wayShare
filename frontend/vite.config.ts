import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    },
  },
  server:{
    port:5000,
    proxy:{
      '/api':{
        target:'http://localhost:5000/',
        changeOrigin:true,
      }
    }
  }
})
