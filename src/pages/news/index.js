import React from 'react';
import News from './news';

async function action ({cookie , fetch}) {
    console.log("新闻页面")
    const navigate = useNavigate();
    return {
        title: '京日找房',
        chunks: ['newsPage'],
        keywords: '京日找房',
        description: '京日找房',
        component: (
            <News/>
        )
    };
}

export default action;