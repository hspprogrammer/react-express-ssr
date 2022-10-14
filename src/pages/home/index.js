import React from 'react';
import Home from './home';

async function action ({cookie , fetch}) {
    return {
        title: '京日找房',
        chunks: ['homePage'],
        keywords: '京日找房',
        description: '京日找房',
        component: (
            <Home/>
        )
    };
}

export default action;