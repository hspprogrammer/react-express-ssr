import React from "react";
import router from "./routes/routeRender";
import App from "./app";


async function render(context,insertCss,children) {
  const route = await router.resolve(context);
  return (
    <App insertCss={insertCss}>
        {route.component}
      </App>
  )
}

export default render;