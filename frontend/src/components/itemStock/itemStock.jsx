import React from "react";
import './itemStock.css'
import { useNavigate } from 'react-router-dom'
const ItemStock = ({ item }) => {
    const { id_material, name_material, description_material, amount_material, how_much_contains, total_amount_material, buy_price_material } = item
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/stock/updatestock/${id}`);
    };
    return (
        <tr key={id_material} onClick={() => handleRowClick(id_material)} className="cursor-pointer">

            <td className="text-left">{id_material}</td>
            <td className="text-left">{name_material}</td>
            <td className="text-left">{description_material}</td>
            <td className="text-left">{amount_material}</td>
            <td className="text-left">{how_much_contains}</td>
            <td className="text-left">{total_amount_material}</td>
            <td className="text-left">$ {buy_price_material}</td>
        </tr>
    )
}

export default ItemStock