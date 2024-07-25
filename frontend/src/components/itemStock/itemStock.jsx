import React from "react";
import './itemStock.css'
const ItemStock = ({ item }) => {
    const { id, name_material, description_material, amount_material, how_much_contains, total_amount_material, buy_price_material, value_stock } = item
    return (
        <tr>
            <td className="text-left">{id}</td>
            <td className="text-left">{name_material}</td>
            <td className="text-left">{description_material}</td>
            <td className="text-left">{amount_material}</td>
            <td className="text-left">{how_much_contains}</td>
            <td className="text-left">{total_amount_material}</td>
            <td className="text-left">{buy_price_material}</td>
            <td className="text-left">{value_stock}</td>
        </tr>
    )
}

export default ItemStock