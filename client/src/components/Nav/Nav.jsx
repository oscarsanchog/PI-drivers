import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom"
import styles from './Nav.module.css'

const Nav = ({ forCleanDriversFiltered }) => {
  
  return (
    <nav className={styles.navContainer}>
      <button onClick={forCleanDriversFiltered}>
        <Link to={"/home"}>Home</Link>
      </button>

      <button>
        <Link to={"/form"}>Create a driver</Link>
      </button>

      <SearchBar forCleanDriversFiltered={forCleanDriversFiltered}/>
    </nav>
  )
}

export default Nav
