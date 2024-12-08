import { itemClient } from "@components/itemClient/itemClient";

export const itemClientList = ({clients}) => {
    if (clients.length == 0){
        return (
            <h1> Aún no hay clientes en la base de datos</h1>
        );
    };

    return (
        <table className="table-fill">
        <thead>
            <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Nombre</th>
                <th className="text-left">Apellido</th>
                <th className="text-left">Tipo de Cliente</th>
            </tr>
        </thead>
        <tbody className="table-hover">
            {clients.map((client) => (
                <itemClient key={client.id_client} client={client} />
            ))}
        </tbody>

    </table>
    );
}