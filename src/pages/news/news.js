import React from "react";
import s from "./index.less";
import useStyles from 'isomorphic-style-loader/useStyles';
import { useNavigate } from "react-router-dom";

 function News(props, context){
    useStyles(s);
    return (
        <div className="news_panel">
            <div className="title">新sf闻</div>
            <div onClick={() => navigate("/")}>主页</div>
            <div className="content">assfsss</div>
        </div>
    )
}

export default News;