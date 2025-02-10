import { useEffect, useState } from "react";
import './itemStock.css'
import { useNavigate } from 'react-router-dom'

const ItemStock = ({ item }) => {
    const [isMobile, setIsMobile] = useState();
    const { id_material, name_material, amount_material, measurement_material } = item;
    const navigate = useNavigate();

    useEffect(()=> {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 640px)').matches);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);

    }, []);

    const handleRowClick = (id) => {
        navigate(`/stock/detailstock/${id}`);
    };

    return (
        <tr key={id_material} onClick={() => handleRowClick(id_material)} className="cursor-pointer text-center">
            <td className="font-medium">{id_material}</td>
            <td className="font-medium">{name_material}</td>
            <td className="font-medium">{amount_material}</td>
            {!isMobile && (
                <td className="font-medium">{measurement_material}</td>
            )}
        </tr>
    )
}

export default ItemStock