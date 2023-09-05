import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTeams, getDrivers } from "../../redux/actions"

const Form = () => {
    const teams = useSelector(state => state.teams)
    const drivers = useSelector(state => state.drivers)
    const dispatch = useDispatch()

    useEffect(() => {
        teams.length === 0 && dispatch(getTeams());
        drivers.length === 0 && dispatch(getDrivers())
    })

    const uniqueNames = new Set();
    const uniqueNationalities = new Set()

const filteredTeams = teams.filter((team) => {// Verificar si el valor de "name" ya está en el conjunto
  if (!uniqueNames.has(team.name)) {// Si no está en el conjunto, añadirlo y retornar true para mantener el elemento
    uniqueNames.add(team.name);
    return true;
  }// Si el valor ya está en el conjunto, retornar false para filtrar el elemento
  return false;
});

const filteredNationalities = drivers.filter((driver) => {
    if (!uniqueNationalities.has(driver.nationality)) {
      uniqueNationalities.add(driver.nationality);
      return true;
    }
    return false;
  });

  return (
    <section>
      <form action="">
        <div>
          <label htmlFor="forename">Forename: </label>
          <input placeholder="Driver forename " id="forename" type="text" />
        </div>

        <div>
          <label htmlFor="surname">Surname: </label>
          <input type="text" placeholder="Driver surname " id="surname" />
        </div>

        <div>
          <label htmlFor="nationality">Nationality: </label>
          <select name="" id="nationality" defaultValue="selectNationality">
            <option value="selectNationality" disabled="disabled">
              Select nationality
            </option>
            {
                filteredNationalities.sort((a, b) => a.nationality.localeCompare(b.nationality)).map((driver) => (
                    <option key={driver.id} value={driver.nationality}>{driver.nationality}</option>
                ))
            }
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dob">Birthdate: </label>
          <input type="date" id="dob" />
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea name="" id="description" cols="36" rows="4"></textarea>
        </div>

        <div>
          <label htmlFor="teams">Teams: </label>
          <select name="teams" id="teams" defaultValue="selectTeams">
            <option value="selectTeams" disabled="disabled">Select teams</option>
            {
                filteredTeams.sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
                    <option key={team.id} value={team.name}>{team.name}</option>
                ))
            }
            <option value="other">Other</option>
          </select>
            <button>Add team</button> {/* Cada vez que se presione debe aparecer otro select para agregar más teams */}
        </div>

        <button>Create driver</button>
      </form>
    </section>
  )
}

export default Form
