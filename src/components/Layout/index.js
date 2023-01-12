import React from "react";
import useStyles from 'isomorphic-style-loader/useStyles';
import antdStyle from 'antd/dist/reset.css';

export default function Layout({children}){
    useStyles(antdStyle)
    

    return (
        <>
        <div>
        {children}
        </div>
        </>
    )
}