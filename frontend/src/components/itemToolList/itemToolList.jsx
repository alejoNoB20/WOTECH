import ItemTool from "@components/itemTool/itemTool"

const ItemToolList = ({ tools }) => {
    return(
        <>
            {typeof(tools) === 'string' ? (
                <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                    <h1 className="text-black text-xl my-auto">{tools}</h1>
                </div>
            ) : (
                <div className="p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((tool) => (
                        <ItemTool key={tool.id_tool} tool={tool} />
                    ))}
                </div>
            )}
        </>
    )
}

export default ItemToolList
