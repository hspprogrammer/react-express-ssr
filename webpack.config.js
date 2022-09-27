// import webpack from 'webpack';
const path = require('path')
const argv = process.argv;
const isDebug = !argv.includes('--release');

module.exports = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'chunks/[name].js',
      libraryTarget: 'umd'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
              test: /\.(css|less)$/i,
              use: [
                "isomorphic-style-loader", 
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    esModule: false, // !!!important
                  }
                },
                'postcss-loader',
                'less-loader'
              ],
            },
        ],
    },
};