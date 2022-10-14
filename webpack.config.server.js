const { merge } = require('webpack-merge');
const path = require('path')
const baseWebpackConfig = require( "./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DTR = path.resolve(__dirname,'./dist');

const ServerWebpackConfig = merge(baseWebpackConfig,{
    entry: {
        server:['@babel/polyfill','./src/server-entry.js']
    },
    output: {
        path:DIST_DTR,
        filename: "server-entry.js",
        chunkFilename: "chunks/[name].js",
        libraryTarget: "commonjs2",
    },
    module:{
        rules:[
           
        ]
    },
    target: "node",
    plugins: [
    ],
    externals: [
        './chunk-manifest.json',
        './asset-manifest.json',
    ],
    stats:{
        errorDetails:true
    }
})
module.exports = ServerWebpackConfig;