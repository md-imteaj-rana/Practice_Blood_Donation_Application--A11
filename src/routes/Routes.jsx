import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import CreateRequest from "../Pages/Dashboard/CreateRequest/CreateRequest";
import AllRequests from "../Pages/Dashboard/AllRequests/AllRequests";
import MyRequests from "../Pages/Dashboard/MyRequests/MyRequests";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";


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
        }
        
    ]
  },

  {
    path: '/Dashboard',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children:[
        {
            index: true,
            element: <PrivateRoutes><MainDashboard></MainDashboard></PrivateRoutes>
        },
        {
            path:'create-request',
            element: <PrivateRoutes><CreateRequest></CreateRequest></PrivateRoutes>
        },
        {
            path: 'all-request',
            element: <PrivateRoutes><AllRequests></AllRequests></PrivateRoutes>
        },
        {
            path: 'my-requests',
            element: <PrivateRoutes><MyRequests></MyRequests></PrivateRoutes>
        },
        {
            path: 'profile',
            element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
        },
        {
            path: 'all-users',
            element: <PrivateRoutes><AllUsers></AllUsers></PrivateRoutes>
        }
    ]
  }
]);


export default router