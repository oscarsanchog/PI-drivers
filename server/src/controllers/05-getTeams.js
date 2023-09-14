const { Team } = require("../db")
const postTeams = require('./06-postTeams')

module.exports = async (req, res) => {
    const dbTeams = await Team.findAll()

    if (!dbTeams.length) {// si la petición de arriba me arrojó un array vacío es porque no hay teams y los crea desde la api
      await postTeams()
      const createdTeams = await Team.findAll()
      return createdTeams
    }

    return dbTeams
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
