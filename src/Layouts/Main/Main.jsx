import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../Page/Footer/Footer';

const Main = () => {
    const location=useLocation()
    console.log(location)
    const noheaderFooter=location.pathname.includes('login')||location.pathname.includes('register')
    return (
        <div>
            { noheaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
           {noheaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;