import Filters from "../Filters/Filters"
import Cards from "../Cards/Cards"
import { getDrivers } from '../../redux/actions'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const Home = () => {
    const drivers = useSelector(state => state.drivers)
    const dispatch = useDispatch()

    useEffect(()=>{
        drivers.length === 0 && dispatch(getDrivers())
    }, [])
    
    return(
        <div>
            <Filters/>
            <Cards drivers={drivers} />
        </div>
    )
}

export default Home