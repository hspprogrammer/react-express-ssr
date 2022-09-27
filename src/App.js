import React from "react";
import StyleContext from 'isomorphic-style-loader/StyleContext';

function App({insertCss,children}){
    return (
        <StyleContext.Provider value={{ insertCss }}>
            <div>
                {children}
            </div>
        </StyleContext.Provider>
    )
}

export default App;