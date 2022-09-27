import React from "react";
import s from "./index.less";
import useStyles from 'isomorphic-style-loader/useStyles'
import withStyles from 'isomorphic-style-loader/withStyles';

 function News(props, context){
    // useStyles(s);
    // console.log(s,s.news_panel)
    return (
        <div className="news_panel">
            <div className="title">新闻</div>
            <div className="content">内容</div>
        </div>
    )
}

export default withStyles(s)(News);