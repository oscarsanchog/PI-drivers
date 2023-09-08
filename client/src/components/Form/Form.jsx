import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getTeams, getDrivers } from "../../redux/actions"
import validation from '../validations/formValidations'
import axios from "axios"

const Form = () => {
  const dispatch = useDispatch()
  //const navigate = useNavigate()

  const teams = useSelector((state) => state.teams)
  const drivers = useSelector((state) => state.drivers)

  const [count, setCount] = useState(1)
  const [ errors, setErrors] = useState({})
  const [newDriver, setNewDriver] = useState({
    name: {
      plainForename: "",
      plainSurname: "",
    },
    description: "",
    image: {
      url: "", //TODO Arreglar esto en el back, que si se envía como string vacío, cree una foto automáticamente
    },
    nationality: "",
    dob: "",
    teamsId: [],
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
        <option
          key={team.id}
          value={team.id} /* onChange={handleChange} */ /* value={team.name} */
        >
          {team.name}
        </option>
      ))
  }

  const handleAddTeamButton = () => {
    setCount(count + 1)
  }
  const handleRemoveTeamButton = () => {
    count >= 2 && setCount(count - 1)
    newDriver.teamsId.pop()
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    console.log(id);

    if (id === "plainForename" || id === "plainSurname") {
      setNewDriver({
          ...newDriver,
          name: {
            ...newDriver.name,
            [id]: value,
          },
        })

      setErrors(validation({
        ...newDriver,
          name: {
            ...newDriver.name,
            [id]: value,
          },
      }))
    } 

    if (id === "description") {
      setNewDriver({
        ...newDriver,
        [id]: value,
      })

      setErrors(validation({
        ...newDriver,
        [id]: value
      }))
    }

    id === "url" &&
      setNewDriver({
        ...newDriver,
        image: {
          //...newDriver.image,
          [id]: value,
        },
      })

    if(id === "nationality") {
      setNewDriver({
        ...newDriver,
        [id]: value,
      })

      setErrors(validation({
        ...newDriver,
        [id]: value
      }))
    }

    if(id === "dob") {
      setNewDriver({
        ...newDriver,
        [id]: value,
      })

      setErrors(validation({
        ...newDriver,
        [id]: value
      }))
    }

    if (id.includes("teams")) {
      let teamIndex = id.split("").pop()
      !newDriver.teamsId.includes(value) && (newDriver.teamsId[teamIndex] = value)

      setErrors(validation({
        ...newDriver,
        [id]: value
      }))
    }
  }

  const handleSubmit = async (event) => {
    
    //console.log(Object.keys(errors).length === 0);
    if(Object.keys(errors).length >= 1){
      event.preventDefault()
      window.alert('You are missing data or the data is entered incorrectly')

      //useNavigate('detail/')
      return
      
    }
    window.alert('Created successfully!')
    await axios.post("http://localhost:3001/drivers", newDriver)
  }

  //console.log(newDriver);
  //console.log('globalState', drivers);

  return (
    <section>
      <form /* action="" */ onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forename">Forename: </label>
          <input
            value={newDriver.name.plainForename}
            onChange={handleChange}
            placeholder="Driver forename"
            id="plainForename"
            type="text"
          />
          {errors.forename && <p style={{color: 'red'}}>{errors.forename}</p>}
        </div>

        <div>
          <label htmlFor="surname">Surname: </label>
          <input
            value={newDriver.name.plainSurname}
            onChange={handleChange}
            type="text"
            placeholder="Driver surname"
            id="plainSurname"
          />
          {errors.surname && <p style={{color: 'red'}}>{errors.surname}</p>}
        </div>

        <div>
          <label htmlFor="nationality">Nationality: </label>
          <select
            onChange={handleChange}
            value={newDriver.nationality}
            name=""
            id="nationality" /* defaultValue="selectNationality" */
          >
            <option value="selectNationality">Select nationality</option>
            {nationalityOption()}
            <option value="other">Other</option>
          </select>
            {errors.nationality && <p style={{color: 'red'}}>{errors.nationality}</p>}
        </div>

        <div>
          <label htmlFor="url">Image: </label>
          <input
            value={newDriver.image.url}
            onChange={handleChange}
            placeholder="Paste your image url"
            type="url"
            name="url"
            id="url"
            pattern="https?://.+"
          />
        </div>

        <div>
          <label htmlFor="dob">Birthdate: </label>
          <input
            type="date"
            id="dob"
            value={newDriver.dob}
            onChange={handleChange}
          />
          {errors.dob && <p style={{color: 'red'}}>{errors.dob}</p>}

        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <input
            value={newDriver.description}
            onChange={handleChange}
            name="description"
            id="description"
          />
          
        </div>
        {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}

        <div>
          <label htmlFor={`teams${count - 1}`}>Teams: </label>
          {[...Array(count)].map((_, i) => ( // Crear los selectores usando el contador
              <select
                key={i}
                name={`teams${i}`}
                id={`teams${i}`}
                defaultValue="selectTeams"
                /* value={newDriver.teamsId} */ onChange={handleChange}>
                <option value="selectTeams">Select teams</option>
                {teamsOption()}
                <option value="other">Other</option>
              </select>
            )
          )}
          {errors.team && <p style={{color: 'red'}}>{errors.team}</p>}
        </div>

        <div>
          <button
            disabled={count <= 1}
            type="button"
            onClick={handleRemoveTeamButton}>
            Remove driver
          </button>
          <button type="button" onClick={handleAddTeamButton}>
            Add team
          </button>
        </div>

        <button>Create driver</button>
      </form>
    </section>
  )
}

export default Form