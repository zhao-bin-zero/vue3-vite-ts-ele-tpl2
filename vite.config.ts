import type { ConfigEnv, UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log('mode', mode)
  return defineConfig({
    plugins: [
      vuePlugin()
      // 实时进行eslint编译，会影响错误测试，故注释
      // eslintPlugin({
      //   cache: false,
      //   include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx']
      // })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@assets/styles/_variables.scss";`
        }
      }
    },
    server: {
      //服务器主机名
      host: '0.0.0.0',
      //端口号
      port: 3188,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: true
      //自定义代理规则
      // proxy: {
      //   // 选项写法
      //   '/api': {
      //     target: 'http://dms-api-test.loyioa.com/',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    resolve: {
      alias: {
        '~': resolve('./'),
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      }
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表
    }
  })
}
