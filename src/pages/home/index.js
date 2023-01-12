import React from 'react';
import Home from './home';

async function action ({cookie , fetch}) {
    return {
        title: '首页',
        chunks: ['homePage'],
        keywords: 'SEO页面关键词',
        description: 'SEO页面描述',
        component: (
            <Home/>
        )
    };
}

export default action;