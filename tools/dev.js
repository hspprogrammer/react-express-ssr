import path from 'path';
import webpack from "webpack";
import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import browserSync from "browser-sync";
import run,{ format } from "./run";
import clean from './clean';

const watchOptions = {
  // Watching may not work with NFS and machines in VirtualBox
  // Uncomment next line if it is your case (use true or interval in milliseconds)
  // poll: true,
  // Decrease CPU or memory usage in some file systems
  // ignored: /node_modules/,
};

let app;
let bs;

const hotMiddlewareScript ='webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

async function dev() {
 try{

  const clientConfig = require("../webpack.config.client");
  const serverConfig = require("../webpack.config.server");

  // clientConfig.entry.client.unshift(hotMiddlewareScript)

  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  const clientCompiler = webpack(clientConfig);

  serverConfig.entry.server.unshift(hotMiddlewareScript)
  serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
  serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  const serverCompiler = webpack(serverConfig);

  const clientPromise = createCompilationPromise(
    "client",
    clientCompiler,
    clientConfig
  );
  const serverPromise = createCompilationPromise(
    "server",
    serverCompiler,
    serverConfig
  );

  

  await run(clean);

  const server = express();
  server.use((req,res,next)=>{
    console.log("拦截器url",req.url)
    next()
  });
  console.log('static_path',path.resolve(__dirname,'../'))
  server.use(express.static(path.resolve(__dirname,'../')));

  server.use(webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true
    }));
  server.use(webpackHotMiddleware(clientCompiler, { 
    log: false,
    path: '/__webpack_hmr', 
  }));
  
  let appPromise;
  let appPromiseResolve;
  let appPromiseIsResolved = true;
  serverCompiler.hooks.compile.tap('server', () => {
      if (!appPromiseIsResolved) return;
      appPromiseIsResolved = false;
      // eslint-disable-next-line no-return-assign
      appPromise = new Promise(resolve => (appPromiseResolve = resolve));
  });
  
  

  server.use((req, res) => {
      appPromise.then(() => app.handle(req, res)).catch(error => console.error(error));
  });

  function checkForUpdate(fromUpdate) {
        const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
        if (!app.hot) {
            throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
        }
        if (app.hot.status() !== 'idle') {
            return Promise.resolve();
        }
        return app.hot.check(true).then(updatedModules => {
                if (!updatedModules) {
                    if (fromUpdate) {
                        console.info(`${hmrPrefix}Update applied.`);
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    console.info(`${hmrPrefix}Nothing hot updated.`);
                } else {
                    console.info(`${hmrPrefix}Updated modules:`);
                    updatedModules.forEach(moduleId =>
                        console.info(`${hmrPrefix} - ${moduleId}`),
                    );
                    checkForUpdate(true);
                }
            })
            .catch(error => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    console.warn(`${hmrPrefix}Cannot apply update.`);
                    delete require.cache[require.resolve('../dist/server-entry.js')];
                    // eslint-disable-next-line global-require, import/no-unresolved
                    app = require('../dist/server-entry.js').default;
                    console.warn(`${hmrPrefix}App has been reloaded.`);
                } else {
                    console.warn(
                        `${hmrPrefix}Update failed: ${error.stack ||
                            error.message}`,
                    );
                }
            });
    }

  serverCompiler.watch({}, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      checkForUpdate().then(() => {
          appPromiseIsResolved = true;
          appPromiseResolve();
          // bs.reload();
      });
  }
  });

  await clientPromise;
  await serverPromise;

  const timeStart = new Date();
    
  app = require('../dist/server-entry.js').default;
  appPromiseIsResolved = true;
  appPromiseResolve();
  
  bs = browserSync.create();

  await bs.init(
    {
      server: "src/server-entry.js",
      middleware: [server],
      port: 3000,
      open:true
    },
    (error, bs) => {
      console.log("--------error----------");
      console.log(error);
    }
  );
  // server.listen(3000, () => {
  //   console.log("Your app is running");
  // });

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);

  return server;


 }catch(err){
  console.info("err",err)
 }
}

function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    let timeStart = new Date();
    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date();
      console.info(`[${format(timeStart)}] Compiling '${name}'...`);
    });

    compiler.hooks.done.tap(name, (stats) => {
      console.info(stats.toString(config.stats));
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.info(
          `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`
        );
        reject(new Error("Compilation failed!"));
      } else {
        console.info(
          `[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`
        );
        resolve(stats);
      }
    });
  });
}

export default dev;