import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ItemClient = ({client}) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const handleClick = () => {
        navigate(`/clients/detailclient/${client.id_client}`);
    };

    useEffect(()=> {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);

    }, []);

    return (
        <tr key={client.id_client} onClick={handleClick} className="cursor-pointer">
            <td className="font-medium">{client.id_client}</td>
            <td className="font-medium">{client.name_client}</td>
            <td className="font-medium">{client.last_name_client}</td>
            {!isMobile && (<td className="font-medium">{client.type_client}</td>)}
        </tr>
    );
};
