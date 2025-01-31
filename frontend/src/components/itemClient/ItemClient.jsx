import React from "react";
import { useNavigate } from "react-router-dom";

export const ItemClient = ({client}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/clients/detailclient/${client.id_client}`);
    };

    return (
        <tr key={client.id_client} onClick={handleClick} className="cursor-pointer">
            <td className="text-left font-medium">{client.id_client}</td>
            <td className="text-left font-medium">{client.name_client}</td>
            <td className="text-left font-medium">{client.last_name_client}</td>
            <td className="text-left font-medium">{client.type_client}</td>
        </tr>
    );
};
