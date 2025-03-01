import React, { useState, useEffect } from 'react';
import NavBar from '@components/navBar/navBar';
import Sidebar from '@components/sideBar/sidebar';
import Footer from '@components/footer/footer';
import Dropdown from '@components/dropdown/Dropdown';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(null);

    const location = useLocation()
    const routeLinks = {
        "/stock": [
            { name: "Ver materiales", path: "/stock/getstock/1" },
            { name: "Agregar material", path: "/stock/addstock" },
        ],
        "/products": [
            { name: "Ver productos", path: "/products/getproducts/1" },
            { name: "Agregar producto", path: "/products/addproduct" },
        ],
        "/orders": [
            { name: "Ver pedidos", path: "/orders/getorders/1" },
            { name: "Crear pedido", path: "/orders/addorders" },
        ],
        "/tools": [
            { name: "Ver herramientas", path: "/tools/gettools/1" },
            { name: "Agregar herramienta", path: "/tools/addtool" },
        ],
        "/clients": [
            { name: "Ver clientes", path: "/clients/getclients/1" },
            { name: "Registrar cliente", path: "/clients/addclient" },
        ],
        "/suppliers": [
            { name: "Ver proveedores", path: "/suppliers/getsuppliers/1" },
            { name: "Registrar proveedor", path: "/suppliers/addsuppliers" },
            { name: "Compra de materiales", path: "/suppliers/purchase" },
        ],
    };
    const currentBasePath = `/${location.pathname.split('/')[1]}`;
    const links = routeLinks[currentBasePath] || [];
    const finalLinks = [{name: "Inicio", path: "/home"}, ...links];
    
    useEffect(()=> {

        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
            };

            checkMobile();

            window.addEventListener('resize', checkMobile);

            return () => window.removeEventListener('resize', checkMobile);

    }, []);

    return (
        <>
            {isMobile ? (
                    <main className="flex flex-col">
                        <Dropdown links={finalLinks}/> 
                        <div className='mt-16'>
                            {children}
                        </div>
                        <Footer/>
                    </main>
            ) : (
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <div className="flex flex-grow mt-16">
                        <Sidebar links={finalLinks} />
                        <main className="flex-grow p-10 ml-64">
                            {children}
                        </main>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Layout;
