import ItemTool from "../itemTool/itemTool";

const ItemToolList = ({ tools }) => {
    console.log(tools)
    return (
        <div className="p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => (
                <ItemTool key={tool.id} tool={tool} />
            ))}
        </div>
    )
};

export default ItemToolList;