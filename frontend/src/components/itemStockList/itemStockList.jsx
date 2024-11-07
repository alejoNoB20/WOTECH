import ItemStock from "components/itemStock/itemStock";
import './itemStockList.css'
const ItemList = ({ items }) => {
    return (
        <table className="table-fill">
            <thead>
                <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Cantidades</th>
                    <th className="text-left">Unidad de medida</th>
                </tr>
            </thead>
            <tbody className="table-hover">
                {items.length > 0 && items.map((item) => (
                    <ItemStock key={item.id_material} item={item} />
                ))}
            </tbody>

        </table>
    )
}

export default ItemList