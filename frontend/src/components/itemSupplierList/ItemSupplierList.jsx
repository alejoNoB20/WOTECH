import ItemSupplier from "@components/ItemSupplier/ItemSupplier";
import { useEffect, useState } from "react";
const ItemSupplierList = ({list}) => {
    const [isMobile, setIsMobile] = useState();

    useEffect(()=> {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);

    }, []);

    return(
        <>
            {typeof(list) === 'string' ? (
                <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{list}</h1>
                </div>
            ) : (
                <table className="w-full h-full border border-gray-300">
                <thead >
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre del proveedor</th>
                        <th className="text-center">Dirección del proveedor</th>
                        {!isMobile && (
                            <>
                                <th className="text-center">Número del proveedor</th>
                                <th className="text-center">Nombre del distribuidor</th>
                                <th className="text-center">Número del distribuidor</th>
                            </>
                        )}
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