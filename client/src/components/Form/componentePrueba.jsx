import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTeams, getDrivers } from "../../redux/actions"

const Form = () => {
  const teams = useSelector((state) => state.teams)
  const drivers = useSelector((state) => state.drivers)
  const dispatch = useDispatch()
  const [ count, setCount ] = useState(1)
  const [ newDriver, setNewDriver ] = useState({
      name: {
        plainForename: '',
        plainSurname: ''
      },
      description: "", 
      image: {
        url: ''
      },
      nationality: "",
      dob: "",
      teamsId: []
  })

  useEffect(() => {
    teams.length === 0 && dispatch(getTeams())
    drivers.length === 0 && dispatch(getDrivers())
  }, [dispatch, teams, drivers])

  const uniqueNationalities = new Set()
  const filteredNationalities = drivers.filter((driver) => {
    if (!uniqueNationalities.has(driver.nationality)) {
      uniqueNationalities.add(driver.nationality)
      return true
    }
    return false
  })

  const nationalityOption = () => {
    return filteredNationalities
      .sort((a, b) => a.nationality.localeCompare(b.nationality))
      .map((driver) => (
        <option key={driver.id} value={driver.nationality}>
          {driver.nationality}
        </option>
      ))
  }

  const teamsOption = () => {
    return teams
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((team) => (
        <option key={team.id} value={team.name}>
          {team.name}
        </option>
      ))
  }

  const handleAddTeamButton = () => {
    setCount(count + 1)
  }
  
  const handleRemoveTeamButton = () => {
    count >= 2 && setCount(count - 1)
  }

  const handleChange = event => {
    const { id, value } = event.target

    id === 'forename' || 'surename' && setNewDriver({
        ...newDriver,
        name: {
          ...newDriver.name,
          [id]: value
        }
      })

    id === 'description' && setNewDriver({
      ...newDriver,
      [id]: value
    })

    id === 'url' && setNewDriver({
      ...newDriver,
      image: {
        //...newDriver.image,
        [id]: value
      }
    })

    id === 'nationality' && setNewDriver({
      ...newDriver,
      [id]: value
    })

    id === 'dob' && setNewDriver({
      ...newDriver,
      [id]: value
    })
  }

  console.log(newDriver)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section>
      <form /* action="" */ onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forename">Forename: </label>
          <input value={newDriver.name.plainForename} onChange={handleChange} placeholder="Driver forename " id="plainForename" type="text" />
        </div>

        <div>
          <label htmlFor="surname">Surname: </label>
          <input value={newDriver.name.plainSurname} onChange={handleChange} type="text" placeholder="Driver surname " id="plainSurname" />
        </div>

        <div>
          <label htmlFor="nationality">Nationality: </label>
          <select onChange={handleChange} value={newDriver.nationality} name="" id="nationality" defaultValue="selectNationality">
            <option value="selectNationality" >
              Select nationality
            </option>
            {nationalityOption()}
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="url">Image: </label>
          <input value={newDriver.image.url} onChange={handleChange} placeholder="Paste your image url" type="url" name="url" id="url" pattern="https?://.+"/>
        </div>

        <div>
          <label htmlFor="dob">Birthdate: </label>
          <input type="date" id="dob" value={newDriver.dob} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea textarea value={newDriver.description} onChange={handleChange} name="description" id="description" cols="36" rows="4"/>
        </div>


        <div>
          <label htmlFor={`teams${count - 1}`}>Teams: </label>
          {[...Array(count)].map((_, i) => ( // Crear los selectores usando el contador
              <select key={i} name={`teams${i}`} id={`teams${i}`} defaultValue="selectTeams" /* value={newDriver.teamsId} */ onChange={handleChange}>
                <option value="selectTeams" > Select teams </option>
                {teamsOption()}
                <option value="other">Other</option>
              </select>
            )
          )}

          <div>
            <button disabled={count <= 1} type="button" onClick={handleRemoveTeamButton}>Remove driver</button>
            <button type="button" onClick={handleAddTeamButton}>Add team</button>
          </div>
        </div>

        <button>Create driver</button>
      </form>
    </section>
  )
}

export default Form