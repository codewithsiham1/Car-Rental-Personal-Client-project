import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../Page/Footer/Footer';

const Main = () => {
    const location = useLocation();
    const noheaderFooter =
        location.pathname.includes('login') ||
        location.pathname.includes('register');

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            {!noheaderFooter && <Navbar />}

            {/* Main content */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
            </main>

            {/* Footer */}
            {!noheaderFooter && <Footer />}
        </div>
    );
};

export default Main;
