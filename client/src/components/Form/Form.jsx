import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getTeams, getDrivers } from "../../redux/actions"
import validation from '../validations/formValidations'
import axios from "axios"
import styles from './Form.module.css'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    event.preventDefault()
    //console.log(Object.keys(errors).length === 0);
    if(Object.keys(errors).length >= 1){
      
      window.alert('You are missing data or the data was introduced incorrectly')

      //useNavigate('detail/')
      return
    }
    window.alert('Created succesfully!')

    await axios.post("http://localhost:3001/drivers", newDriver)
    && navigate('/home')
  }

  //console.log(newDriver);
  //console.log('globalState', drivers);

  return (
    <section className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div>
          <label htmlFor="forename" title={errors.forename? errors.forename: "It must not be empty and not have any symbols"}>Forename: </label>
          <input
            required
            value={newDriver.name.plainForename}
            onChange={handleChange}
            placeholder="Driver forename"
            id="plainForename"
            type="text"
            title={errors.forename? errors.forename: "It must not be empty and not have any symbols"}
            autoFocus
            /* pattern={/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]*$/} */
          />
          {errors.forename && <span title={errors.forename && errors.forename} style={{color: 'red'}}> *</span>}
        </div>

        <div>
          <label title={errors.surname? errors.surname: "It must not be empty and not have any symbols"} htmlFor="surname">Surname: </label>
          <input
            required
            value={newDriver.name.plainSurname}
            onChange={handleChange}
            type="text"
            placeholder="Driver surname"
            id="plainSurname"
            title={errors.surname? errors.surname: "It must not be empty and not have any symbols"}
          />
          {errors.surname && <span title={errors.surname && errors.surname} style={{color: 'red'}}> *</span>}
        </div>

        <div>
          <label title={errors.nationality? errors.nationality: 'You must select a nationality'} htmlFor="nationality">Nationality: </label>
          <select
            required
            onChange={handleChange}
            value={newDriver.nationality}
            name=""
            id="nationality" /* defaultValue="selectNationality" */
            title={errors.nationality? errors.nationality: 'You must select a nationality'}
          >
            <option value="selectNationality">Select nationality</option>
            {nationalityOption()}
            {/* <option value="other">Other</option> */}
          </select>
          {errors.nationality && <span title={errors.nationality && errors.nationality} style={{color: 'red'}}> *</span>}
        </div>

        <div>
          <label title="Paste your url" htmlFor="url">Image: </label>
          <input
            title="Paste your url"
            value={newDriver.image.url}
            onChange={handleChange}
            placeholder="Paste your image url"
            type="url"
            name="url"
            id="url"
          />
        </div>

        <div>
          <label title={errors.dob? errors.dob: 'You must introduce the birthdate'} htmlFor="dob">Birthdate: </label>
          <input
            required
            type="date"
            id="dob"
            value={newDriver.dob}
            onChange={handleChange}
            title={errors.dob? errors.dob: 'You must introduce the birthdate'}
          />
          {errors.dob && <span title={errors.dob && errors.dob} style={{color: 'red'}}> *</span>}
        </div>

        <div>
          <div>
          <label title={errors.description? errors.description: 'You must introduce a description'} htmlFor="description">Description</label>
          {errors.description && <span title={errors.description && errors.description} style={{color: 'red'}}> *</span>}

          </div>
          <textarea
            className={styles.description}
            required
            value={newDriver.description}
            onChange={handleChange}
            name="description"
            id="description"
            title={errors.description? errors.description: 'You must introduce a description'}
          />
        </div>

        <div className={styles.teams}>
          <div>

          <label title={errors.team? errors.team: 'You must introduce a team'} htmlFor={`teams${count - 1}`}>Teams</label>
          {errors.team && <span title={errors.team && errors.team} style={{color: 'red'}}> *</span>}
          </div>

          {[...Array(count)].map((_, i) => ( // Crear los selectores usando el contador
              <select
                required
                key={i}
                name={`teams${i}`}
                id={`teams${i}`}
                defaultValue="selectTeams"
                title={errors.team? errors.team: 'You must introduce a team'}
                onChange={handleChange}
              >
                <option value="selectTeams">Select teams</option>
                {teamsOption()}
              </select>
            )
          )}
        </div>

        <div className={styles.teamButtons}>
          <button
            disabled={count <= 1}
            type="button"
            onClick={handleRemoveTeamButton}>
            ➖
          </button>
          <button type="button" onClick={handleAddTeamButton}>
            ➕
          </button>
        </div>

        <button>Create driver</button>
      </form>
    </section>
  )
}

export default Form