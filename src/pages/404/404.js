import React from 'react';
import NotFoundPage from './404';

async function action () {
    return {
        title: '京日找房',
        chunks: ['notfound'],
        component: (
            <NotFoundPage />
        )
    };
}
export default action;