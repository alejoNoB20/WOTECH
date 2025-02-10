import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const ItemSupplier = ({item}) => {
    const [isMobile, setIsMobile] = useState();
    const { id_supplier, name_company_supplier, number_phone_company_supplier, tax_address_supplier, distributor_name_supplier, number_phone_distributor_supplier } = item
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
        navigate(`/suppliers/datailssupplier/${id}`);
    };

    return (
        <tr key={id_supplier} onClick={() => handleRowClick(id_supplier)} className="cursor-pointer">
            <td className="font-medium">{id_supplier}</td>
            <td className="font-medium">{name_company_supplier}</td>
            <td className="font-medium">{tax_address_supplier}</td>
            {!isMobile && (
                <>
                    <td className="font-medium">{number_phone_company_supplier}</td>
                    <td className="font-medium">{distributor_name_supplier}</td>
                    <td className="font-medium">{number_phone_distributor_supplier}</td>
                </>
            )}
        </tr>
)

};

export default ItemSupplier;