import React, { Suspense }  from "react";
import StyleContext from 'isomorphic-style-loader/StyleContext';

function App({insertCss,children}){
    return (
        <Suspense fallback={<div>加载中。。。</div>}>
            <StyleContext.Provider value={{ insertCss }}>
                <div>
                    {children}
                </div>
            </StyleContext.Provider>
        </Suspense>
    )
}

export default App;