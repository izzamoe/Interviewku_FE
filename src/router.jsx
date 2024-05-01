import {createBrowserRouter,} from "react-router-dom";
import React, {lazy} from "react";
// import {loader} from "./pages/Page2.jsx";
const Layout = lazy(() => import("./layout/navbar.jsx"));
const Page2 = lazy(() => import("./pages/Page2.jsx"));
const Page3 = lazy(() => import("./pages/Page3.jsx"));

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                path : "/",
                element : <div>Hello world!</div>,
            },
            {
                path : "/page2",
                element : <Page2 />,
            },
            {
                path : "/page3",
                element : <Page3 />,
            },
        ],
    },
]);

export default router;