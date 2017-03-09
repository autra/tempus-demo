let path = require('path');

module.exports = {
  entry: {
    'tempus-osm': [path.resolve(__dirname, 'js/index-osm.js') ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    publicPath: '/dist/'
  }
};

