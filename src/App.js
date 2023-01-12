import React, { Suspense }  from "react";
import Layout from "./components/Layout";
import StyleContext from 'isomorphic-style-loader/StyleContext';

function App({insertCss,children}){
    return (
        <Suspense fallback={<div>加载中。。。</div>}>
            <StyleContext.Provider value={{ insertCss }}>
                <Layout children={children}/>
            </StyleContext.Provider>
        </Suspense>
    )
}

export default App;