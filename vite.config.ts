import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
export default defineConfig({
  plugins: [react()],
  root: resolve('.', 'src'),
  build: {
    outDir: resolve('.', 'dist'),
  },
})
