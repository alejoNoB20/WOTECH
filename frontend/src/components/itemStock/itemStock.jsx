import React from "react";
import './itemStock.css'
import { useNavigate } from 'react-router-dom'

const ItemStock = ({ item }) => {
    const { id_material, name_material, amount_material, measurement_material } = item
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/stock/updatestock/${id}`);
    };
    return (
        <tr key={id_material} onClick={() => handleRowClick(id_material)} className="cursor-pointer">
            <td className="text-left">{id_material}</td>
            <td className="text-left">{name_material}</td>
            <td className="text-left">{amount_material}</td>
            <td className="text-left">{measurement_material}</td>
        </tr>
    )
}

export default ItemStock