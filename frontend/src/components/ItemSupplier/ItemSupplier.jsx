import React from "react";
import { useNavigate } from 'react-router-dom';

const ItemSupplier = ({item}) => {
    const { id_supplier, name_company_supplier, number_phone_company_supplier, tax_address_supplier, distributor_name_supplier, number_phone_distributor_supplier } = item
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/suppliers/datailssupplier/${id}`);
    };

    return (
        <tr key={id_supplier} onClick={() => handleRowClick(id_supplier)} className="cursor-pointer">
            <td className="text-left font-medium">{id_supplier}</td>
            <td className="text-left font-medium">{name_company_supplier}</td>
            <td className="text-left font-medium">{number_phone_company_supplier}</td>
            <td className="text-left font-medium">{tax_address_supplier}</td>
            <td className="text-left font-medium">{distributor_name_supplier}</td>
            <td className="text-left font-medium">{number_phone_distributor_supplier}</td>
        </tr>
)

};

export default ItemSupplier;