import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({
 root:fileURLToPath(new URL('.',import.meta.url)),
 base:'./',
 publicDir:'../public',
 plugins:[react()],
 css:{postcss:{plugins:[]}},
 server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
 build:{outDir:'../pages-dist',emptyOutDir:true},
});
