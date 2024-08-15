import { useEffect, useState } from "react"
import ItemList from '../../components/itemStockList/itemStockList'
import Loader from "../../components/loader/Loader"



const GetStock = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchData = () => {
            fetch('https://wotech.onrender.com/stock')
                .then(response => response.json())
                .then(response => setItems(response.resultado))
                .finally(()=> setLoading(false))
        }
        fetchData()
    },[])

    return (
        <>
        {loading? (
            <Loader/>
        ):(
            <ItemList items = {items}/>
        )}
        </>
    )
}
export default GetStock