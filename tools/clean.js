import {delDir} from "./lib/fs";
import path from "path";

export default function clean(){
    console.log('path',path.resolve(__dirname,'../dist'))
    return delDir(path.resolve(__dirname,'../dist'))
}