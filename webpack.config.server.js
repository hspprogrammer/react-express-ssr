import nodeExternals from 'webpack-node-externals';
const { merge } = require('webpack-merge');
const path = require('path')
const baseWebpackConfig = require( "./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
import webpack from 'webpack';
const DIST_DTR = path.resolve(__dirname,'./dist');

const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

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
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
        }),
    ],
    externals: [
        './chunk-manifest.json',
        './asset-manifest.json',
        nodeExternals({
            allowlist: [reStyle, reImage],
        }),
    ],
    stats:{
        errorDetails:true
    }
})
module.exports = ServerWebpackConfig;