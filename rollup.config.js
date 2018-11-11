import babel from 'rollup-plugin-babel'

const lib = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
  plugins: [babel()],
}

export default [lib]
