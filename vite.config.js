import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import arrayPlugin from './arrayPlugin';

export default defineConfig(() => {
  return {
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      BUILD_DATE: JSON.stringify((new Date()).toLocaleDateString('en',{day: "numeric", month: "short", year: "numeric"})),
    },
    build: {
      outDir: 'build',
    },
    plugins: [react(), nodePolyfills(), arrayPlugin()],
    worker: {
      format: "es",
      plugins: () => [arrayPlugin()],
    },
  };
});