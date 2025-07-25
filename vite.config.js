// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   base: "/SubMind/",
//   plugins: [react(),
//   tailwindcss(),
//   ],
//   build: {
//     outDir: 'dist',
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
//   // 👇 fix for refresh error
//   server: {
//     historyApiFallback: true,
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/SubMind/",
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './', 
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    historyApiFallback: true,
  }
})
