import SearchBar from "../SearchBar/SearchBar"

import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <button>
        <Link to={"/home"}>Home</Link>
      </button>

      <button>
        <Link to={"/form"}>Create a driver</Link>
      </button>

      <button>
        <Link to={"/about"}>About me</Link>
      </button>

      <SearchBar />
    </nav>
  )
}

export default Nav
