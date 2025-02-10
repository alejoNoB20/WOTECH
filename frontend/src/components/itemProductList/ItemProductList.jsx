import Product from "@components/itemProduct/ItemProduct";

const ItemList = ({list}) => {
    return(
        <>
        {typeof(list) === 'string' ? (
            <div className="flex w-full mb:py-64 px-5 md:h-full justify-center text-center bg-gray-200">
                <h1 className="text-black text-xl my-auto">{list}</h1>
            </div>
        ) : (
            <div className="p-6 bg-gray-200 container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((product)=> (
                    <Product key={product.id_product} product={product}/>
                ))
            }
            </div>
        )}
        </>
    )
};

export default ItemList;