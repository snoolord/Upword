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
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
