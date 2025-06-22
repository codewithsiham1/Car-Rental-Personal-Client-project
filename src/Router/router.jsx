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
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Cart from "../Page/Dashboard/Cart/Cart";
import AdminHome from "../Page/Dashboard/AdminHome/AdminHome";
import TutorHome from "../Page/DashboardTutor/TutorHome/TutorHome";
import StudentHome from "../Page/DashboardStudent/StudentHome/StudentHome";
import ViewAllSessions from "../Page/Dashboard/ViewAllSessions/ViewAllSessions";
import ViewAllMaterials from "../Page/Dashboard/ViewAllMaterials/ViewAllMaterials";
import MyNotes from "../Page/DashboardStudent/StudentHome/MyNotes/MyNotes";
import StudentMetarils from "../Page/DashboardStudent/StudentMetarils/StudentMetarils";
import MySessions from "../Page/DashboardTutor/MySessions/MySessions";
import UploadMaterials from "../Page/DashboardTutor/UploadMaterials/UploadMaterials";
import TutorMaterials from "../Page/DashboardTutor/TutorMaterials/TutorMaterials";
import MyBookedSessions from "../Page/DashboardStudent/MyBookedSessions/MyBookedSessions";
import Viewalluser from "../Page/Dashboard/Viewalluser/Viewalluser";

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
    },
    {
        path:"dashboard",
        element:<Privateroute><Dashboard></Dashboard></Privateroute>,
        children:[
            // coomon
            {
              path:"cart",
              element:<Cart></Cart>  
            },
            // admin route
            {
          path:"admin/home",
          element:<AdminHome></AdminHome>
            },
            {
                path:"admin/users",
                element:<Viewalluser></Viewalluser>
            },
            {
            path:"admin/sessions",
            element:<ViewAllSessions></ViewAllSessions>
            },
            {
            path:"admin/materials",
            element:<ViewAllMaterials></ViewAllMaterials>
            },

            // tutor
          {
            path:"tutor/home",
            element:<TutorHome></TutorHome>
          },
          {
            path:"tutor/sessions",
            element:<MySessions></MySessions>
          },
          {
           path:"tutor/materials/upload",
           element:<UploadMaterials></UploadMaterials>
          },
          {
         path:"tutor/materials",
         element:<TutorMaterials></TutorMaterials>
          },
     
        //   student
        {
            path:"student/home",
            element:<StudentHome></StudentHome>
        },
             {
          path:"student/booked-sessions",
          element:<MyBookedSessions></MyBookedSessions>
          },
          {
           path:"student/notes",
           element:<MyNotes></MyNotes>
          },
          {
          path:"student/materials",
          element:<StudentMetarils></StudentMetarils>
          },
        ]
    }
])
export default router;