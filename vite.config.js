import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3333
  },
  plugins: [react()],
})
