import { PATH } from "./paths";
import Main from "../components/pages/main/Main";
import News from "../components/pages/news/News";

export const routes = [
    {
        path: PATH.BASE_PAGE,
        component: Main,
        exact: true
    },
    {
        path: PATH.MAIN_PAGE,
        component: Main,
        exact: true
    },
    {
        path: PATH.NEWS_PAGE,
        component: News,
        exact: true
    }
];