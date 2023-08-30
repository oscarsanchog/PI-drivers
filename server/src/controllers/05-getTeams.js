const axios = require("axios")
const { Team } = require("../db")
const URL_API = require("../utils/url")

const postTeams = async () => {
  const { data: apiDrivers } = await axios(URL_API)

  await apiDrivers // Necesita un await porque al final tiene una petición a la BD
    .filter((driver) => driver.teams) // filtra la propiedad teams del array que devuelve la API
    .map((obj) => obj.teams.split(",")) // filter  devuelve un obj con arr y a los strings dentro de los array los separo por cada ','
    .flat() // Uno los strings en un solo array
    .forEach((team) => Team.findOrCreate({ where: { name: team } })) //por cada string del array (por cada equipo), creo un nuevo value en la tabla con tal equipo
}

const getTeams = async (req, res) => {
  try {
    const dbTeams = await Team.findAll()

    if (!dbTeams.length) {// si la petición de arriba me arrojó un array vacío es porque no hay teams y los crea desde la api
      await postTeams()
      return res.status(200).json(await Team.findAll())
    }

    res.status(200).json(dbTeams)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getTeams,
  postTeams,
}

/*  
  const { data: apiDrivers } = await axios(URL_API)

  const allTeams = apiDrivers
    .filter((driver) => driver.teams)
    .map((obj) => obj.teams.split(","))
    .flat()

  await allTeams.forEach((team) => Team.findOrCreate({ where: { name: team } }))
 */

//console.log(Array.isArray(allTeams))

/* const teams = apiDrivers.map(driver => {
        // return driver.teams
        return driver.teams.forEach(team => {
            words.forEach
        })
        
    })

    const team = teams.map(team => {
        if (team !== undefined) return team.split(',')
    }) */

/* const drivers = [
        {
          id: 1,
          driverRef: "hamilton",
          teams: "McLaren, Mercedes",
        },
        {
            id: 2,
            driverRef: "hamilton",
            teams: "McLaren, Mercedes",
        },
        {
            id: 3,
            driverRef: "hamilton",
            teams: undefined,
        },
    ] */

// console.log(apiDrivers);
