import { defineConfig } from 'vite';

export default defineConfig({
  base: '/labyrinth/', // Replace 'labyrinth' with your GitHub repository name
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        page2: 'generate_labyrinth.html',
      },
    },
  },
});
