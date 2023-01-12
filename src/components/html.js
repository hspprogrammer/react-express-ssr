import React from "react";

export default function Html({
    title='react-express-srr',
    description = '',
    keywords='ssr',
    styles=[],
    scripts=[],
    app ={},
    children='',
}){
    return (
        <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="../public/favicon.ico"></link>
                {/* <script src="./js/webreport.js"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.Performance({
                            // domain: 'https://abc.com',
                            // filterUrl: ['https://abc.com']
                        });`,
                    }}
                /> */}
                {/* {scripts.map(script => (
                    <link
                        key={script}
                        rel="preload"
                        href={script}
                        as="script"
                    />
                ))} */}
                {styles.map(style => (
                    <style
                        key={style.id}
                        id={style.id}
                        dangerouslySetInnerHTML={{ __html: style.cssText }}
                    />
                ))}
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `window.App=${serialize(app)}`,
                    }}
                /> */}
                {scripts.map(script => (
                    <script key={script} src={script} />
                ))}
            </body>
        </html>
    )
}