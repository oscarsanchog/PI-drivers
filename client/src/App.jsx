import { Route, Routes, useLocation } from "react-router-dom"
import "./styles/App.css"

import LandingPage from "./components/LandingPage/LandingPage"
import Nav from "./components/Nav/Nav"
import Home from "./components/Home/Home"
import Detail from "./components/Detail/Detail"
import Form from "./components/Form/Form"
import { useDispatch } from "react-redux"
import { cleanDriversFiltered } from "./redux/actions"

const App = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const forCleaningDriversFiltered = (cleanState, filterFunction) => {
    cleanState === "cleanState" && dispatch(cleanDriversFiltered())

    if (filterFunction === "byName")
      document.getElementById("orderByDob").value = "orderByDob"
    if (filterFunction === "byDob")
      document.getElementById("orderByName").value = "orderByName"
    if (filterFunction === "byOrigin") {
      document.getElementById("orderByName").value = "orderByName"
      document.getElementById("orderByDob").value = "orderByDob"
      document.getElementById("filterByTeam").value = "filterByTeam"
    }
    if (filterFunction === "byTeam") {
      document.getElementById("orderByName").value = "orderByName"
      document.getElementById("orderByDob").value = "orderByDob"
      document.getElementById("filterByOrigin").value = "filterByOrigin"
    }
    if (filterFunction === "clearButton") {
      document.getElementById("orderByName").value = "orderByName"
      document.getElementById("orderByDob").value = "orderByDob"
      document.getElementById("filterByOrigin").value = "filterByOrigin"
      document.getElementById("filterByTeam").value = "filterByTeam"
    }
  }

  const teamsFormat = (id, teams) => {
    const teamStringFormat = /,(?!\s)/g

    return !isNaN(id) // si el id es un numero, es un driver de la API
      ? teams?.replace(teamStringFormat, ", ") // Para separar 'team, team' cuando no tenga tal formato en la API
      : teams.map((team) => team.name).join(", ") // Mapea en su prop name al array de los teams de los drivers de la db y luego los transforma en string para renderizarlos
  }

  const teamsOptions = (teams, prop) => {
    //console.log(teams);
    return teams
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((team) => (
        <option key={team.id} value={team[prop]}>
          {" "}
          {/* Si la ejecución la recibo desde Filters, value será 'name' (tiene que filtrar por nombre). Si la recibe desde Form, prop será el id (necesita crear el newDriver por id) */}
          {team.name}
        </option>
      ))
  }

  return (
    <div className="appContainer">
      {pathname !== "/" && (
        <Nav forCleaningDriversFiltered={forCleaningDriversFiltered} />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={
            <Home
              teamsOptions={teamsOptions}
              teamsFormat={teamsFormat}
              forCleaningDriversFiltered={forCleaningDriversFiltered}
            />
          }
        />

        <Route
          path="/detail/:id"
          element={<Detail teamsFormat={teamsFormat} />}
        />

        <Route
          path="/form"
          element={
            <Form
              forCleaningDriversFiltered={forCleaningDriversFiltered}
              teamsOptions={teamsOptions}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
