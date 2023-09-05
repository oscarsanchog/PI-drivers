import { useDispatch } from "react-redux"
import { getDriversByName, getDriverById, getDrivers, cleanDriversFiltered } from "../../redux/actions"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

const SearchBar = () => {
  const [name, setName] = useState("")
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const onSearch = (name) => {
    dispatch(getDriversByName(name))
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //event.preventDefault()
      document.getElementById("searchButton").click()
    }
  }

  const handleDisabled = () => {
    const urlId = pathname.split("/")[2]

    return pathname !== "/form" &&
      pathname !== "/about" &&
      pathname !== `/detail/${urlId}`
      ? false
      : true
  }

  const idArray = []

  const randomHandler = async () => {
    const URL_SERVER = 'http://localhost:3001/drivers'

    if(idArray.length === 0){
      const { data } = await axios(URL_SERVER)
      data.forEach(driver => idArray.push(driver.id))
    }
    const randomIndex = Math.floor(Math.random() * idArray.length)
    const randomId = idArray[randomIndex]
    dispatch(getDriverById(randomId))
    setName("")
  }

  const clearHandler = async () => {
    dispatch(cleanDriversFiltered())
    setName("")
  }

  return (
    <div>
      <input
        type="text"
        name="driverName"
        placeholder="Write a driver name"
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={handleDisabled()}
        onClick={() => setName("")}
      />

      <button id="searchButton" onClick={() => onSearch(name)} disabled={handleDisabled()}>
        🔍
      </button>

      <button id="randomButton" disabled={handleDisabled()} onClick={randomHandler}>🎲</button>

      <button id="clearButton" disabled={handleDisabled()} onClick={clearHandler}>🧹</button>
    </div>
  )
}

export default SearchBar
