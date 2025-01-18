import ItemStock from "@components/itemStock/itemStock";
import './itemStockList.css'
const ItemList = ({ items }) => {
    return (
        <>
            {typeof(items) === 'string' ? (
                <div className="flex w-full h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{items}</h1>
                </div>
            ) : (
                <table className="table-fill">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Cantidades</th>
                            <th className="text-center">Unidad de medida</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {items.length > 0 && items.map((item) => (
                            <ItemStock key={item.id_material} item={item} />
                        ))}
                    </tbody>

                </table>
            )}
        </>
    )
}

export default ItemList