import React from 'react';
import NavBar from 'components/navBar/navBar';
import Sidebar from 'components/sideBar/sidebar';
import Footer from 'components/footer/footer';
import { useLocation } from 'react-router-dom';
const Layout = ({ children, logged }) => {
    const location = useLocation()
    const routeLinks = {
        "/stock": [
            { name: "Ver materiales", path: "/stock/getstock" },
            { name: "Agregar material", path: "/stock/addstock" },
        ],
        "/products": [
            { name: "Ver productos", path: "/products/getproducts" },
            { name: "Crear producto", path: "/products/addproduct" },
        ],
        "/orders": [
            { name: "Crear orden", path: "/createorder" },
            { name: "Ver ordenes", path: "/vieworders" },
        ],
        "/tools": [
            { name: "Ver herramientas", path: "/tools/gettools" },
            { name: "Crear herramienta", path: "/tools/addtool" },
        ],
    };
    const currentBasePath = `/${location.pathname.split('/')[1]}`
    const links = routeLinks[currentBasePath] || []
    const finalLinks = [{name: "Inicio", path: "/"}, ...links]
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar logged={logged} />
            <div className="flex flex-grow mt-16">
                <Sidebar links={finalLinks} />
                <main className="flex-grow p-10 ml-64">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
