import React,{useState,useEffect} from "react";
import s from "./home.less";
import useStyles from 'isomorphic-style-loader/useStyles';
import { useNavigate } from "react-router-dom";

export default function Home(){
    useStyles(s)
    // const navigate = useNavigate();
    const [dateStr,setDateStr] = useState('');

    console.log('sss')
    useEffect(()=>{
        setDateStr("hsp");
        console.log('sss')
    },[])
    return (
        <div>
            <div>首页d5</div>
            <div onClick={() => navigate("/news")}>新闻</div>
            <div>{dateStr}</div>
            <img className="nick_name_img" src="../../../public/images/01.png"  />
        </div>
    )
}