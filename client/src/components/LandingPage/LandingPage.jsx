import { Link } from 'react-router-dom'

const LandingPage = () => {
    return(
        <>
            <button>
                <Link to={'/home'}>Ingresar</Link>
            </button>
        </>
    )
}

export default LandingPage