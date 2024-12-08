import React from "react";
import { useNavigate } from "react-router-dom";

export const itemClient = ({client}) => {
    const navigate = useNavigate;
    const handleClick = (id) => {
        navigate(`/client/detailclient/${id}`);
    };

    return (
        <tr key={client.id_client} onClick={() => handleClick(id)} className="cursor-pointer">
        <td className="text-left">{client.name_client}</td>
        <td className="text-left">{client.last_name_client}</td>
        <td className="text-left">{client.type_client}</td>
    </tr>
    )
};