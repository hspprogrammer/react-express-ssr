import {delDir} from "./lib/fs";
import path from "path";
import run,{ format } from "./run";
import clean from './clean';
import webpack from "webpack";
import clientConfig from "../webpack.config.client";
import serverConfig from "../webpack.config.server";

export default async function build(){
    await run(clean);
    await run(buildClient);
    await run(buildServer);
}

// 打包client
function buildClient(){
    return new Promise((resolve,reject)=>{
        webpack(clientConfig).run((err, stats) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
        
            if (stats.hasErrors()) {
                console.error(stats.toString("errors-only"));
                return reject();
            }
            resolve();
          });
    })
}

// 打包server
function buildServer(){
    return new Promise((resolve,reject)=>{
        webpack(serverConfig).run((err, stats) => { // [Stats Object](#stats-object)
            if(err){
                return reject(err);
            }
          
            return resolve();
          });
    })
}