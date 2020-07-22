module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ],
  plugins: [
    'transform-react-jsx',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-transform-runtime'
  ],
}
