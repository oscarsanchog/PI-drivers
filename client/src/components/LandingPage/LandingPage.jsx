import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDrivers } from '../../redux/actions'

// Este componente se encarga de cargar el state de drivers
const LandingPage = () => {
    /* const dispatch = useDispatch()
    
    const uploadDrivers = () => {
        dispatch(getDrivers())
    } */
    
    return(
        <>
            <button /* onClick={() => uploadDrivers()} */>
                <Link to={'/home'}>Ingresar</Link>
            </button>
        </>
    )
}

export default LandingPage

