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
                <table className="w-full mb:h-[66dvh] border border-gray-300">
                <thead >
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Dirección</th>
                        {!isMobile && (
                            <>
                                <th className="text-center">Número</th>
                                <th className="text-center">Nombre del distribuidor</th>
                                <th className="text-center">Número del distribuidor</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {Array.isArray(list) && list.map((item) => (
                        <ItemSupplier key={item.id_supplier} item={item} />
                    ))}
                </tbody>

            </table>
            )}
        </>
    )
};

export default ItemSupplierList;