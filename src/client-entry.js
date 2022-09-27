import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import action from "./pages/home";
import router from "./routes/routeRender";


const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

router.resolve({ pathname: '/news' }).then(action => {
  ReactDOM.hydrate(
  (
    <App insertCss={insertCss}>
      {action.component}
    </App>
  ), 
    document.getElementById('root'))
})
