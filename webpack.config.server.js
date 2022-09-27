const { merge } = require('webpack-merge');
const path = require('path')
const baseWebpackConfig = require( "./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ServerWebpackConfig = merge(baseWebpackConfig,{
    entry: {
        server:['@babel/polyfill','./src/server-entry.js']
    },
    output: {
      filename: "server-entry.js"
    },
    module:{
        rules:[
           
        ]
    },
    target: "node",
    plugins: [
    ],
})
module.exports = ServerWebpackConfig;