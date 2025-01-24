import { ItemClient } from "@components/itemClient/ItemClient";

export const ItemClientList = ({clients}) => {
    return(
        <>
            {typeof(clients) === 'string' ? (
                <div className="flex w-full h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{clients}</h1>
                </div>
            ) : (
                <table className="table-fill">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Apellido</th>
                        <th className="text-center">Tipo de Cliente</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {clients.map((client) => (
                        <ItemClient key={client.id_client} client={client} />
                    ))}
                </tbody>

            </table>
            )}
        </>
    )
}