import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import MyProfile from "../Pages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
            path: '/Login',
            element: <Login></Login>
        }, 
        {
            path: '/Register',
            element: <Register></Register>
        },
        {
            path: '/Profile',
            element: <MyProfile></MyProfile>
        }
    ]
  },
]);


export default router