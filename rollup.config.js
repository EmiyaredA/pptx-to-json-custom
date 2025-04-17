import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import terser from '@rollup/plugin-terser'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'

const onwarn = warning => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return

  console.warn(`(!) ${warning.message}`) // eslint-disable-line
}

// 检查是否为开发模式
const isDev = process.env.NODE_ENV === 'development'

// 根据模式选择插件
const getPlugins = () => {
  const plugins = [
    nodeResolve({
      preferBuiltins: false,
    }),
    commonjs(),
    eslint(),
    babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'],
    }),
    globals(),
    builtins(),
  ]
  
  // 只在生产模式下使用 terser
  if (!isDev) {
    plugins.push(terser())
  }
  
  return plugins
}

export default {
  input: 'src/pptxtojson.js',
  onwarn,
  output: [
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'pptxtojson',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: getPlugins()
}