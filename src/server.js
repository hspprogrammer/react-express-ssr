import React from "react";
import express from "express";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import browserSync from 'browser-sync';

const isDebug = !process.argv.includes('--release');


const server = express();

let serverEntry = require("../dist/server-entry").default;
let template = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf-8"
);

// 静态资源映射到dist路径下
server.use("/dist", express.static(path.join(__dirname, "../dist")));

server.use("/public", express.static(path.join(__dirname, "../public")));

/* eslint-disable no-console */

server.get("*",async (req, res,next) => {
  try{
    console.log("======enter server======");

    const css = new Set(); // CSS for all rendered React components
    const insertCss = (...styles) => styles.forEach((style) => {
      css.add(style._getCss())
    });
    const context = {
      pathname: req.url,
    };

    let children = await serverEntry(context, insertCss);

    let html = ReactDOMServer.renderToString(children);

    const htmlStr = `<!doctype html>
    <html>
      <head>
        <script src="client.js" defer></script>
        <style>${[...css].join("")}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>`;

    // let htmlStr = template.replace("<!--hsp-->", `<div id='root'>${html}</div>`);
    // 将渲染后的html字符串发送给客户端
    res.status(200);
    res.send(htmlStr);
  }catch(err){
    // console.err(err)
    next(err);
  }
});

isDebug ? 
browserSync.create().init(
  {
      // https://www.browsersync.io/docs/options
      server: '../dist/server-entry.js',
      middleware: [server],
      open: !process.argv.includes('--silent'),
      port:3000,
      ...(isDebug ? {} : { notify: false, ui: false }),
  },
  (error, bs) => {
    console.log({error})
  },
)
:
server.listen(3000, () => {
  console.log("Your app is running");
});
