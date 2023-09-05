import { Link } from 'react-router-dom'

// Este componente se encarga de cargar el state de drivers
const LandingPage = () => {
    return(
        <>
            <button /* onClick={() => uploadDrivers()} */>
                <Link to={'/home'}>Ingresar</Link>
            </button>
        </>
    )
}

export default LandingPage

