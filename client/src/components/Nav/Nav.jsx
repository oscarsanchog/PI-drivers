import SearchBar from "../SearchBar/SearchBar"
import Random from "../Random/Random"
import ClearSearch from "../ClearSearch/ClearSearch"
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <button>
        <Link to={"/home"}>Home</Link>
      </button>

      <button>
        <Link to={"/form"}>Add a driver</Link>
      </button>

      <button>
        <Link to={"/about"}>About me</Link>
      </button>

      <SearchBar />

      <Random />

      <ClearSearch />
    </nav>
  )
}

export default Nav
