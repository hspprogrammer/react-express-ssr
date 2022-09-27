const { merge } = require('webpack-merge');
const path = require('path')
const baseWebpackConfig = require( "./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ClientWebpackConfig = merge(baseWebpackConfig,{
    entry: {
        client: ['@babel/polyfill','./src/client-entry.js']
    },
    output: {
    },
    module:{
        rules:[
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            filename: "index.html",
            minify:false
        })
    ],
    target: "web",
})
module.exports = ClientWebpackConfig;