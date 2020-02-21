module.exports = {
  presets: [
    '@vue/app'
  ],
  ignore:[
    './src/common/*.js'
  ],
  plugins:['transform-remove-strict-mode']
}
