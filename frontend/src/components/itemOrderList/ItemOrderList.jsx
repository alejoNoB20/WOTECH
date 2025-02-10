import ItemOrder from "@components/itemOrder/ItemOrder";

const ItemOrderList = ({list}) => {
    return (
        <>
            {typeof(list) === 'string' ? (
            <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                <h1 className="text-black text-xl my-auto">{list}</h1>
            </div>
            ) : (
                <div className="p-6 bg-gray-200 container grid gap-6">
                {list.map((order)=> (
                        <ItemOrder key={order.id_order} order={order}/>
                    ))
                }
                </div>
            )}
        </>
    )
};

export default ItemOrderList;