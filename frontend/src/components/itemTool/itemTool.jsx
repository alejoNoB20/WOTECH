import React from "react"
import { useNavigate } from "react-router-dom"

const ItemTool = ({ tool }) => {
  const { name_tool, status_tool, location_tool, id_tool, img_tool } = tool
  const navigate = useNavigate()

  const handleToolClick = (id) => {
    navigate(`/tools/updatetool/${id}`)
  }

  // Ajuste para manejar los diferentes colores según el estado
  const statusColor =
    status_tool === "Habilitado"
      ? "text-green-600"
      : status_tool === "Inhabilitado"
      ? "text-red-600"
      : status_tool === "En Arreglo"
      ? "text-blue-600"
      : status_tool === "Perdido" ? "text-gray-400"
      : ""

  return (
    <div
      onClick={() => handleToolClick(id_tool)}
      className="flex w-full max-w-[457.5px] h-[137.5px] my-4 rounded-lg overflow-hidden shadow-lg transition-all duration-150 ease-in-out hover:shadow-md cursor-pointer"
    >
      <div className="flex-2">
        <img
          src={img_tool ||"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Hand_tools.jpg/1200px-Hand_tools.jpg"}
          alt={name_tool}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-3 p-2">
        <div className="flex flex-col h-full">
          <h1 className="text-xl">{name_tool}</h1>
          <p className="text-gray-600 text-sm font-semibold">
            Ubicación: {location_tool}
          </p>
          <p className={`text-lg font-semibold ${statusColor}`}>
            Estado: {status_tool}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ItemTool
