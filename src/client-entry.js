import React from "react";
import {hydrateRoot,createRoot}from 'react-dom/client';
import App from "./app";
import router from "./routes/routeRender";
import deepForceUpdate from 'react-deep-force-update';

import history from './history';


const context = {};
let currentLocation = history;
let appInstance;
 
async function onLocationChange({location, action}){

  const isInitialRender = action;

  context.pathname = location.pathname;

  console.log("客户端渲染",context,location)
  const route = await router.resolve(context);
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
  }
  const element = (<App insertCss={insertCss}>
    {route.component}
  </App>);
  const container = document.getElementById('app');
  appInstance = isInitialRender ? hydrateRoot(container,element) : createRoot(container).render(element);

}





history.listen(onLocationChange);
onLocationChange(currentLocation);



if (module.hot) {
  module.hot.accept('./routes/routeRender', () => {
      if (appInstance && appInstance.updater.isMounted(appInstance)) {
          // Force-update the whole tree, including components that refuse to update
          deepForceUpdate(appInstance);
      }
      console.log('client----router更新')
      onLocationChange(currentLocation);
  });
}