"use strict";
exports.id = "server";
exports.ids = null;
exports.modules = {

/***/ "./src/server-entry.js":
/*!*****************************!*\
  !*** ./src/server-entry.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "./node_modules/express/index.js");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _routes_routeRender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/routeRender */ "./src/routes/routeRender.js");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-manifest.json */ "./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.node.js");
/* harmony import */ var _components_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/html */ "./src/components/html.js");
/* harmony import */ var _pages_404_404__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/404/404 */ "./src/pages/404/404.js");




 // eslint-disable-line import/no-unresolved





const isDebug = !process.argv.includes('--release');
const server = express__WEBPACK_IMPORTED_MODULE_1___default()(); // let template = fs.readFileSync(
//   path.resolve(__dirname, "../dist/index.html"),
//   "utf-8"
// );
// 静态资源映射到dist路径下
// server.use("/dist", express.static(path.join(__dirname, "../dist")));

server.use("/public", express__WEBPACK_IMPORTED_MODULE_1___default()["static"](path__WEBPACK_IMPORTED_MODULE_5___default().join(__dirname, "../public")));
server.get("*", async (req, res, next) => {
  try {
    // CSS for all rendered React components
    const css = new Set();

    const insertCss = (...styles) => styles.forEach(style => {
      css.add(style._getCss());
    });

    const context = {
      pathname: req.url
    };
    const route = await _routes_routeRender__WEBPACK_IMPORTED_MODULE_3__["default"].resolve(context);
    const data = { ...route
    };
    data.children = await (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_app__WEBPACK_IMPORTED_MODULE_2__["default"], {
      insertCss: insertCss
    }, route.component));
    data.styles = [{
      id: 'css',
      cssText: [...css].join('')
    }]; // 挂在script

    let scripts = new Set();

    const addChunk = chunk => {
      if ((_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_4___default())[chunk]) {
        (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_4___default())[chunk].forEach(asset => scripts.add(asset));
      } //  else if (__DEV__) { //__DEV__全局变量 开发环境
      //      throw new Error(`Chunk with name '${chunk}' cannot be found`);
      //  }

    };

    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);
    const html = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_html__WEBPACK_IMPORTED_MODULE_7__["default"], data));
    ; // 将渲染后的html字符串发送给客户端

    res.status(200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    // console.err(err)
    next(err);
  }
});
server.use((err, req, res, next) => {
  // global.errorLog.error('pe render error', pe.render(err));
  if (err) {
    const html = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToStaticMarkup)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_html__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: "404",
      description: err.message,
      styles: [{
        id: 'css',
        cssText: ''
      }] // eslint-disable-line no-underscore-dangle

    }, (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pages_404_404__WEBPACK_IMPORTED_MODULE_8__.NotFoundPage, {
      error: err
    }))));
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
  } else {
    res.redirect(302, '/404');
  }
});

if (false) {} // Hot Module Replacement


if (true) {
  server.hot = module.hot;
  module.hot.accept(/*! ./routes/routeRender */ "./src/routes/routeRender.js", __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _routes_routeRender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/routeRender */ "./src/routes/routeRender.js");
(() => {
    console.log('router更新');
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (server);

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bad4a621f388178018eb")
/******/ })();
/******/ 
/******/ }
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9zZXJ2ZXIuYWY2MmE1NDljZDA5NzBmZWQzYzkuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBOztBQUdBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFIQTtBQUtBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7OztBQU9BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUlBOzs7Ozs7Ozs7QUMvR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1leHByZXNzLXNzci8uL3NyYy9zZXJ2ZXItZW50cnkuanMiLCJ3ZWJwYWNrOi8vcmVhY3QtZXhwcmVzcy1zc3Ivd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL2FwcFwiO1xuaW1wb3J0IHJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvcm91dGVSZW5kZXJcIjtcbmltcG9ydCBjaHVua3MgZnJvbSAnLi9jaHVuay1tYW5pZmVzdC5qc29uJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7cmVuZGVyVG9TdHJpbmcscmVuZGVyVG9TdGF0aWNNYXJrdXB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG5pbXBvcnQgSHRtbCBmcm9tIFwiLi9jb21wb25lbnRzL2h0bWxcIjtcbmltcG9ydCB7IE5vdEZvdW5kUGFnZSB9IGZyb20gJy4vcGFnZXMvNDA0LzQwNCc7XG5cbmNvbnN0IGlzRGVidWcgPSAhcHJvY2Vzcy5hcmd2LmluY2x1ZGVzKCctLXJlbGVhc2UnKTtcblxuXG5jb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG5cbi8vIGxldCB0ZW1wbGF0ZSA9IGZzLnJlYWRGaWxlU3luYyhcbi8vICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9kaXN0L2luZGV4Lmh0bWxcIiksXG4vLyAgIFwidXRmLThcIlxuLy8gKTtcblxuLy8g6Z2Z5oCB6LWE5rqQ5pig5bCE5YiwZGlzdOi3r+W+hOS4i1xuLy8gc2VydmVyLnVzZShcIi9kaXN0XCIsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vZGlzdFwiKSkpO1xuXG5zZXJ2ZXIudXNlKFwiL3B1YmxpY1wiLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3B1YmxpY1wiKSkpO1xuXG5cbnNlcnZlci5nZXQoXCIqXCIsYXN5bmMgKHJlcSwgcmVzLG5leHQpID0+IHtcbiAgdHJ5e1xuICAgIC8vIENTUyBmb3IgYWxsIHJlbmRlcmVkIFJlYWN0IGNvbXBvbmVudHNcbiAgICBjb25zdCBjc3MgPSBuZXcgU2V0KCk7IFxuICAgIGNvbnN0IGluc2VydENzcyA9ICguLi5zdHlsZXMpID0+IHN0eWxlcy5mb3JFYWNoKChzdHlsZSkgPT4ge1xuICAgICAgY3NzLmFkZChzdHlsZS5fZ2V0Q3NzKCkpXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgcGF0aG5hbWU6IHJlcS51cmwsXG4gICAgfTtcblxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVyLnJlc29sdmUoY29udGV4dCk7XG4gICAgY29uc3QgZGF0YSA9IHsgLi4ucm91dGUgfTtcblxuICAgXG4gICAgZGF0YS5jaGlsZHJlbiA9IGF3YWl0IHJlbmRlclRvU3RyaW5nKFxuICAgICAgPEFwcCBpbnNlcnRDc3M9e2luc2VydENzc30+XG4gICAgICAgIHtyb3V0ZS5jb21wb25lbnR9XG4gICAgICA8L0FwcD5cbiAgICApO1xuICAgIGRhdGEuc3R5bGVzID0gW3sgaWQ6ICdjc3MnLCBjc3NUZXh0OiBbLi4uY3NzXS5qb2luKCcnKSB9XTtcblxuICAgICAvLyDmjILlnKhzY3JpcHRcbiAgICAgbGV0IHNjcmlwdHMgPSBuZXcgU2V0KCk7XG4gICAgIGNvbnN0IGFkZENodW5rID0gY2h1bmsgPT4ge1xuICAgICAgICAgaWYgKGNodW5rc1tjaHVua10pIHtcbiAgICAgICAgICAgICBjaHVua3NbY2h1bmtdLmZvckVhY2goYXNzZXQgPT4gc2NyaXB0cy5hZGQoYXNzZXQpKTtcbiAgICAgICAgIH0gXG4gICAgICAgIC8vICBlbHNlIGlmIChfX0RFVl9fKSB7IC8vX19ERVZfX+WFqOWxgOWPmOmHjyDlvIDlj5Hnjq/looNcbiAgICAgICAgLy8gICAgICB0aHJvdyBuZXcgRXJyb3IoYENodW5rIHdpdGggbmFtZSAnJHtjaHVua30nIGNhbm5vdCBiZSBmb3VuZGApO1xuICAgICAgICAvLyAgfVxuICAgICB9O1xuICAgICBhZGRDaHVuaygnY2xpZW50Jyk7XG4gICAgIGlmIChyb3V0ZS5jaHVuaykgYWRkQ2h1bmsocm91dGUuY2h1bmspO1xuICAgICBpZiAocm91dGUuY2h1bmtzKSByb3V0ZS5jaHVua3MuZm9yRWFjaChhZGRDaHVuayk7XG4gXG4gICAgIGRhdGEuc2NyaXB0cyA9IEFycmF5LmZyb20oc2NyaXB0cyk7XG4gICAgXG4gICAgY29uc3QgaHRtbCA9ICByZW5kZXJUb1N0cmluZyg8SHRtbCB7Li4uZGF0YX0gLz4pOztcbiAgICAvLyDlsIbmuLLmn5PlkI7nmoRodG1s5a2X56ym5Liy5Y+R6YCB57uZ5a6i5oi356uvXG4gICAgcmVzLnN0YXR1cygyMDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gIH1jYXRjaChlcnIpe1xuICAgIC8vIGNvbnNvbGUuZXJyKGVycilcbiAgICBuZXh0KGVycik7XG4gIH1cbn0pO1xuXG5zZXJ2ZXIudXNlKChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIC8vIGdsb2JhbC5lcnJvckxvZy5lcnJvcigncGUgcmVuZGVyIGVycm9yJywgcGUucmVuZGVyKGVycikpO1xuICBpZiAoZXJyKSB7XG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdGF0aWNNYXJrdXAoXG4gICAgICAgICAgPEh0bWxcbiAgICAgICAgICAgICAgdGl0bGU9XCI0MDRcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17ZXJyLm1lc3NhZ2V9XG4gICAgICAgICAgICAgIHN0eWxlcz17W3sgaWQ6ICdjc3MnLCBjc3NUZXh0OiAnJyB9XX0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgICAge3JlbmRlclRvU3RyaW5nKDxOb3RGb3VuZFBhZ2UgZXJyb3I9e2Vycn0gLz4pfVxuICAgICAgICAgIDwvSHRtbD4sXG4gICAgICApO1xuICAgICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XG4gICAgICByZXMuc2VuZChgPCFkb2N0eXBlIGh0bWw+JHtodG1sfWApO1xuICB9IGVsc2Uge1xuICAgICAgcmVzLnJlZGlyZWN0KDMwMiwgJy80MDQnKTtcbiAgfVxufSk7XG5cblxuaWYgKCFtb2R1bGUuaG90KSB7XG4gIHNlcnZlci5saXN0ZW4oMzAwMCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiWW91ciBhcHAgaXMgcnVubmluZ1wiKTtcbiAgfSk7XG59XG5cbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmIChtb2R1bGUuaG90KSB7XG4gIHNlcnZlci5ob3QgPSBtb2R1bGUuaG90O1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9yb3V0ZXMvcm91dGVSZW5kZXInLCgpPT57XG4gICAgY29uc29sZS5sb2coJ3JvdXRlcuabtOaWsCcpXG4gIH0pO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImJhZDRhNjIxZjM4ODE3ODAxOGViXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9