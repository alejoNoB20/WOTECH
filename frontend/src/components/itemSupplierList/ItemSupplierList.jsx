import ItemSupplier from "@components/ItemSupplier/ItemSupplier";

const ItemSupplierList = ({list}) => {

    return(
        <>
            {typeof(list) === 'string' ? (
                <div className="flex w-full h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{list}</h1>
                </div>
            ) : (
                <table className="table-fill">
                <thead >
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre del proveedor</th>
                        <th className="text-center">Número del proveedor</th>
                        <th className="text-center">Dirección del proveedor</th>
                        <th className="text-center">Nombre del distribuidor</th>
                        <th className="text-center">Número del distribuidor</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {list.map((item) => (
                        <ItemSupplier key={item.id_supplier} item={item} />
                    ))}
                </tbody>

            </table>
            )}
        </>
    )
};

export default ItemSupplierList;