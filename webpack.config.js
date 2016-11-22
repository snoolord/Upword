const path = require('path');

module.exports = {
  entry: {
    './content/content': './content/src/content',
    './event/event': './event/src/event',
    './popup/popup': './popup/src/popup'
  },

  output: {
    filename: '[name].js',
    path: './',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

// content: ['./content/src/content.js'],
// event: ['./event/src/event.js'],
// popup: ['./popup/src/popup.js'],
// vendors: ['react']
