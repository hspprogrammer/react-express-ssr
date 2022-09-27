
import HomePage from "../pages/home/index";
import NewsPage from "../pages/news";


const routes = {
    path:'/',
    children:[
        {
            path:"",
            load:()=> import(/* webpackChunkName: 'homePage' */ "../pages/home/index"),
            // load:()=>HomePage,
        },
        {
            path:"/news",
            load:()=> import(/* webpackChunkName: 'NewsPage' */ "../pages/news/index"),
        },
        {
            path:"(.*)",
            load:()=>import(/* webpackChunkName: 'notFoundPage' */ "../pages/404/index")
        }
    ],
    async action(context, params) {
        const route = await context.next();
        return route;
    }
}


export default routes;