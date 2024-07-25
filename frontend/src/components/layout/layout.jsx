import React from 'react';
import NavBar from '../navBar/navBar';
import Sidebar from '../sideBar/sidebar';
import Footer from '../footer/footer';
const Layout = ({ children, links, logged }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar logged={logged} />
            <div className="flex flex-grow mt-16">
                <Sidebar links={links} />
                <main className="flex-grow p-10 ml-64">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
