import React from 'react';
import News from './news';

async function action ({cookie , fetch}) {
    return {
        title: '新闻',
        chunks: ['newsPage'],
        keywords: 'SEO页面关键词',
        description: 'SEO页面描述',
        component: (
            <News/>
        )
    };
}

export default action;