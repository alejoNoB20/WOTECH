import ItemStock from "@components/itemStock/itemStock";
import { useState, useEffect } from "react";
import './itemStockList.css'

const ItemList = ({ items }) => {
    const [isMobile, setIsMobile] = useState();

    useEffect(()=> {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);

    }, []);
    
    return (
        <>
            {typeof(items) === 'string' ? (
                <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{items}</h1>
                </div>
            ) : (
                <table className="w-full h-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Cantidades</th>
                            {!isMobile && (
                                <th className="text-center">Unidad de medida</th>
                            )}
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