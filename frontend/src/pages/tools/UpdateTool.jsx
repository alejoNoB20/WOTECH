// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../../components/loader/Loader";
// import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";

// const UpdateTool = () => {
//     const [loading, setLoading] = useState(true)



//     return (
//         <>
//         {loading ? (
//             <Loader/>
//         ):(
//             <div className="mx-auto max-w-4xl rounded overflow-hidden shadow-lg p-4 bg-white flex">
//           <div className="w-1/2 pr-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name_tool">
//                 Nombre de la herramienta:
//               </label>
//               <div className="flex items-center">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="name_tool"
//                   name="name_tool"
//                   type="text"
//                   value={material.name_tool || ''}
//                   onChange={handleChange}
//                   readOnly={!isEditable.name_tool}
//                 />
//                 <button onClick={() => toggleInput('name_material')} className="ml-2">
//                   {!isEditable.name_material ? (
//                     <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
//                   ) : (
//                     <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description_tool">
//                 Descripción:
//               </label>
//               <div className="flex items-center">
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="description_tool"
//                   name="description_tool"
//                   value={material.description_tool || ''}
//                   onChange={handleChange}
//                   readOnly={!isEditable.description_tool}
//                 />
//                 <button onClick={() => toggleInput('description_tool')} className="ml-2">
//                   {!isEditable.description_tool ? (
//                     <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
//                   ) : (
//                     <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location_tool">
//                 Cantidad por unidad:
//               </label>
//               <div className="flex items-center">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="location_tool"
//                   name="location_tool"
//                   type="text"
//                   value={material.location_tool || ''}
//                   onChange={handleChange}
//                   readOnly={!isEditable.location_tool}
//                 />
//                 <button onClick={() => toggleInput('location_tool')} className="ml-2">
//                   {!isEditable.location_tool ? (
//                     <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
//                   ) : (
//                     <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="contains" className="block text-gray-700">Unidad
//                 <input
//                   type="checkbox"
//                   id="contains"
//                   name="contains"
//                   checked={material.contains || false}
//                   onChange={handleChange}
//                   className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </label>
//             </div>
//             {material.contains && (<div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="how_much_contains">
//                 Contiene:
//               </label>
//               <div className="flex items-center">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="how_much_contains"
//                   name="how_much_contains"
//                   type="text"
//                   value={material.how_much_contains || ''}
//                   onChange={handleChange}
//                   readOnly={!isEditable.how_much_contains || ''}
//                 />
//                 <button onClick={() => toggleInput('how_much_contains')} className="ml-2">
//                   {!isEditable.how_much_contains ? (
//                     <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
//                   ) : (
//                     <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>)}

//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buy_price_material">
//                 Precio por unidad:
//               </label>
//               <div className="flex items-center">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="buy_price_material"
//                   name="buy_price_material"
//                   type="text"
//                   value={material.buy_price_material || ''}
//                   onChange={handleChange}
//                   readOnly={!isEditable.buy_price_material}
//                 />
//                 <button onClick={() => toggleInput('buy_price_material')} className="ml-2">
//                   {!isEditable.buy_price_material ? (
//                     <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
//                   ) : (
//                     <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-start space-x-4">
//               <button onClick={handleUpdate} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
//                 <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
//                 Guardar Material
//               </button>

//               <button onClick={handleDelete} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
//                 <FontAwesomeIcon icon={faTrash} className="mr-2" />
//                 Eliminar Material
//               </button>
//             </div>

//           </div>
//           <div className="w-1/2 pl-4">

//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-800">{item.name_material}</h2>
//               <span className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
//                 Stock: {item.total_amount_material}
//               </span>
//             </div>
//             <p className="text-gray-700 text-base mb-4">
//               {item.description_tool}
//             </p>
//             <div className="flex items-center">
//               <div className="text-sm">
//                 <p className="text-gray-600">Código: {item.id_material}</p>
//                 <p className="text-gray-600">Cantidad en unidades: {item.amount_material}</p>
//                 <p className="text-gray-600">Cada uno contiene: {item.how_much_contains}</p>
//                 <p className="text-gray-600">Precio del material: ${item.buy_price_material}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         )

//         }
//         </>
//     )
// }

// export default UpdateTool