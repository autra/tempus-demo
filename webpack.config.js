let path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, 'js/scripts.js') ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tempus-demo.js',
    library: 'tempus-demo',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    publicPath: '/dist/'
  }
};

