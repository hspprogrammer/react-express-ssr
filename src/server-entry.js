import React from "react";
import express from "express";
import App from "./app";
import router from "./routes/routeRender";
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import path from "path";
import {renderToString,renderToStaticMarkup,renderToPipeableStream} from "react-dom/server";
import Html from "./components/html";
import { NotFoundPage } from './pages/404/404';

const isDebug = !process.argv.includes('--release');


const server = express();

// let template = fs.readFileSync(
//   path.resolve(__dirname, "../dist/index.html"),
//   "utf-8"
// );

// 静态资源映射到dist路径下

server.use("/public", express.static(path.join(__dirname, "../public")));


server.get("*",async (req, res,next) => {
  try{
    // CSS for all rendered React components
    const css = new Set(); 
    const insertCss = (...styles) => styles.forEach((style) => {
      css.add(style._getCss())
    });

    const context = {
      pathname: req.url,
    };

    console.log("服务端渲染了",context)
    const route = await router.resolve(context);
    const data = { ...route };

   
    data.children = await renderToString(
      <App insertCss={insertCss}>
        {route.component}
      </App>
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

     // 挂在script
     let scripts = new Set();
     const addChunk = chunk => {
         if (chunks[chunk]) {
             chunks[chunk].forEach(asset => scripts.add(asset));
         } 
        //  else if (__DEV__) { //__DEV__全局变量 开发环境
        //      throw new Error(`Chunk with name '${chunk}' cannot be found`);
        //  }
     };
     addChunk('client');
     if (route.chunk) addChunk(route.chunk);
     if (route.chunks) route.chunks.forEach(addChunk);
 
     data.scripts = Array.from(scripts);
    
    // const html =  renderToString(<Html {...data} />);
    // // 将渲染后的html字符串发送给客户端
    // res.status(200);
    // res.send(`<!doctype html>${html}`);
    const stream = renderToPipeableStream(
      <Html {...data} />,
      {
        onShellReady() {
          res.statusCode =  200;
          res.setHeader("Content-type", "text/html");
          stream.pipe(res);  // 通过 React 的 stream 流式把数据返回
        },
        onError(x) {
          console.error(x);
        },
      }
    );

  }catch(err){
    // console.err(err)
    next(err);
  }
});

server.use((err, req, res, next) => {
  // global.errorLog.error('pe render error', pe.render(err));
  if (err) {
      const html = renderToStaticMarkup(
          <Html
              title="404"
              description={err.message}
              styles={[{ id: 'css', cssText: '' }]} // eslint-disable-line no-underscore-dangle
          >
              {renderToString(<NotFoundPage error={err} />)}
          </Html>,
      );
      res.status(err.status || 500);
      res.send(`<!doctype html>${html}`);
  } else {
      res.redirect(302, '/404');
  }
});


if (!module.hot) {
  server.listen(3000, () => {
    console.log("Your app is running");
  });
}

// Hot Module Replacement
if (module.hot) {
  server.hot = module.hot;
  module.hot.accept('./routes/routeRender',()=>{
    console.log('router更新')
  });
}



export default server;