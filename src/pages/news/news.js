import React from "react";
import s from "./index.less";
import useStyles from 'isomorphic-style-loader/useStyles';
import Link from '../../components/Link';

 function News(props, context){
    useStyles(s);
    return (
        <div className="news_panel">
            <div className="title">新闻</div>
            <Link to="/">主页</Link>
            <div className="content">assfsss</div>
        </div>
    )
}

export default News;