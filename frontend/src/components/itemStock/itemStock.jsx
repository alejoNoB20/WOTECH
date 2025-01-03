import React from "react";
import './itemStock.css'
import { useNavigate } from 'react-router-dom'

const ItemStock = ({ item }) => {
    const { id_material, name_material, amount_material, measurement_material } = item
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/stock/detailstock/${id}`);
    };
    return (
        <tr key={id_material} onClick={() => handleRowClick(id_material)} className="cursor-pointer">
            <td className="text-left font-medium">{id_material}</td>
            <td className="text-left font-medium">{name_material}</td>
            <td className="text-left font-medium">{amount_material}</td>
            <td className="text-left font-medium">{measurement_material}</td>
        </tr>
    )
}

export default ItemStock