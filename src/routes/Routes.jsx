import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import CreateRequest from "../Pages/Dashboard/CreateRequest/CreateRequest";


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
        }
    ]
  }
]);


export default router