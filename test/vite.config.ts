import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';

// console.log(process)
// console.log(import.meta.env.VITE_APP_URL)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '_c': fileURLToPath(new URL('./src/components', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                // '/api'是自行设置的请求前缀
                target: 'http://localhost:5000',
                changeOrigin: true, // 用于控制请求头中的host值
                rewrite: (path) => path.replace(/^\/api/, '') // 路径重写，（正则）匹配以api开头的路径为空（将请求前缀删除）
            }
        }
    }
});
