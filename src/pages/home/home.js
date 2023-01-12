import React,{useState,useEffect} from "react";
import s from "./home.less";
import useStyles from 'isomorphic-style-loader/useStyles';
import Link from '../../components/Link';
import { Button} from 'antd';

export default function Home(){
    useStyles(s)
    const [dateStr,setDateStr] = useState('');

    console.log('sss')
    useEffect(()=>{
        setDateStr("hsp");
    },[])
    const go = (path)=>{
        // navigate("/news")
        window.open('_self').location = '/news';
        console.log('navigate("/news"')
    }
    return (
        <div>
            <div>首页</div>
            <div onClick={() => go('/news')}>新闻onclick</div>
            <Link  to="/news">新闻</Link>
            <div>{dateStr}</div>
            <img className="nick_name_img" src="../../../public/images/01.png"  />
            <Button type="primary">Primary Button</Button>
        </div>
    )
}