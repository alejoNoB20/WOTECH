import React from "react"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Wotech - Gestor de carpintería
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Bienvenido, USER
          </h2>
          <p className="mt-2 text-gray-600">
            Gestiona tus materiales, herramientas y proveedores de manera
            eficiente con Wotech.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Acciones rápidas */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Acciones Rápidas
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                  Agregar Material
                </button>
              </li>
              <li>
                <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
                  Ver Herramientas
                </button>
              </li>
              <li>
                <button className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg">
                  Registrar Proveedor
                </button>
              </li>
            </ul>
          </div>

          {/* Estadísticas */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Estadísticas
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Pedidos en proceso:</span>
                <span className="font-bold text-gray-900">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pedidos a enviar:</span>
                <span className="font-bold text-gray-900">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Materiales con stock bajo:</span>
                <span className="font-bold text-gray-900">8</span>
              </div>
            </div>
          </div>

          {/* Últimas Actualizaciones */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Pedidos a terminar en los próximos días:
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="text-gray-600">
                3 mesas de algarrobo a medida.
              </li>
              <li className="text-gray-600">
                6 sillas de pino a medida.
              </li>
              <li className="text-gray-600">
                10 estantes de 60x60 estándar.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg">
            Ver Todos los Detalles
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
