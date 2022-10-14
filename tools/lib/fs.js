import fs from "fs";
import rimraf from "rimraf";


function delDir(path){
    return new Promise((relsove,reject)=>{
        rimraf(path,(err)=>{
            if(err){
                reject(err)
            }
            relsove()
        })
    })
}

module.exports = {
    delDir:delDir
}