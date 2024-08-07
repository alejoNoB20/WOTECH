import ItemStock from "../itemStock/itemStock";
import './itemList.css'
const ItemList = ({ items }) => {
    return (
        <table className="table-fill">
            <thead>
                <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Descripcion</th>
                    <th className="text-left">Cantidad por unidad</th>
                    <th className="text-left">Contiene</th>
                    <th className="text-left">Cantidad total</th>
                    <th className="text-left">Precio por unidad</th>
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