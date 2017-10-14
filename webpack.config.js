const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      { test: /\.js|\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-cssnext')()
            ]
          }
        }]
      }
    ]
  }

};
