import React from 'react';
import News from './news';

async function action ({cookie , fetch}) {
    return {
        title: '新闻',
        chunks: ['newsPage'],
        keywords: '京日找房',
        description: '京日找房',
        component: (
            <News/>
        )
    };
}

export default action;