import Product from "../../components/itemProduct/ItemProduct";

const ItemList = ({list}) => {
    if(list.length === 0){
        return (
            <div className="mx-auto max-w-4xl flex justify-center text-center bg-white rounded-s-lg">
                <h2 className="text-gray-100 font-normal">No se encontraron productos cargados en la base de datos</h2>
            </div>
        )
    }else {
        return(
            <div className="p-6 bg-gray-200 container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((product)=> (
                        <Product key={product.id_product} product={product}/>
                    ))
                }
            </div>
        )
    }
};

export default ItemList;