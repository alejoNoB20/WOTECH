import { ItemClient } from "@components/itemClient/ItemClient";
import { useState,useEffect } from "react";

export const ItemClientList = ({clients}) => {
    const [isMobile, setIsMobile] = useState();

    useEffect(()=> {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);

    }, []);

    return(
        <>
            {typeof(clients) === 'string' ? (
                <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{clients}</h1>
                </div>
            ) : (
                <table className="w-full h-full">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Apellido</th>
                        {!isMobile && (<th className="text-center">Tipo de Cliente</th>)}
                    </tr>
                </thead>
                <tbody className="table-hover border border-gray-300">
                    {clients.map((client) => (
                        <ItemClient key={client.id_client} client={client} />
                    ))}
                </tbody>

            </table>
            )}
        </>
    )
};
