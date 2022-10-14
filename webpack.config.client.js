// import fs from 'fs';
const fs = require('fs');
const { merge } = require('webpack-merge');
const path = require('path')
const baseWebpackConfig = require( "./webpack.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const isDebug = !process.argv.includes("--release");
const DIST_DTR = path.resolve(__dirname,'./dist');
import webpack from 'webpack';

const ClientWebpackConfig = merge(baseWebpackConfig,{
    entry: {
        client: ['@babel/polyfill','./src/client-entry.js']
    },
    output: {
        path: path.resolve(DIST_DTR, "public/assets"),
        publicPath:'/assets/',
        filename: isDebug?'[name].bundle.js':'[name].[contenthash].bundle.js',
        chunkFilename: isDebug? '[name].chunk.js':'[name].[chunkhash:8].chunk.js',
    },
    module:{
        rules:[
            
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BROWSER': true,
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            filename: "../index.html",
            favicon:path.resolve(__dirname,'./public/favicon.ico'),
            publicPath:"./assets",
            minify:false
        }),
        new WebpackAssetsManifest({
            output:`${DIST_DTR}/asset-manifest.json`,
            publicPath: true,
            writeToDisk: true,
            customize({ key, value }) {
                if(key.toLowerCase().endsWith('.map')) return false;
                return { key, value };
            },
            done:(manifest, stats)=>{
                const chunkFileName = `${DIST_DTR}/chunk-manifest.json`;
                try {
                    const fileFilter = file => !file.endsWith('.map');
                    const addPath = file => manifest.getPublicPath(file);
                    const chunkFiles = stats.compilation.chunkGroups.reduce(
                        (acc, c) => {
                            acc[c.name] = [
                                ...(acc[c.name] || []),
                                ...c.chunks.reduce(
                                    (files, cc) => [
                                        ...files,
                                        ...cc.files
                                            .filter(fileFilter)
                                            .map(addPath),
                                    ],
                                    [],
                                ),
                            ];
                            return acc;
                        },
                        Object.create(null),
                    );
                    fs.writeFileSync(
                        chunkFileName,
                        JSON.stringify(chunkFiles, null, 2),
                    );
                } catch (err) {
                    console.error(
                        `ERROR: Cannot write ${chunkFileName}: `,
                        err,
                    );
                    if (!isDebug) process.exit(1);
                }
            }
        }),
    ],
    target: "web",
})
module.exports = ClientWebpackConfig;