import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Page/Home/Home";
import AllTutors from "../Page/All Tutors/AllTutors";
import Annoucement from "../Page/Annoucement/Annoucement";
import ContactUs from "../Page/ContactUs/ContactUs";
import Login from "../Authtication/Login/Login";
import Register from "../Authtication/Register/Register";
import ErrorElement from "../Page/ErrorElement/ErrorElement";
import Privateroute from "./Privateroute";
import SeassionDetails from "../Page/SeassionDetails/SeassionDetails";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        errorElement:<ErrorElement></ErrorElement>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/all-tutor",
                element:<Privateroute><AllTutors></AllTutors></Privateroute>
            },
            {
                path:"/annousment",
                element:<Annoucement></Annoucement>
            },
            {
                path:"/contact",
                element:<ContactUs></ContactUs>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/session/:id",
                element:<Privateroute><SeassionDetails></SeassionDetails></Privateroute>
            }
        ]
    }
])
export default router;