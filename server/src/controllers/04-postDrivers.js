const { Driver } = require("../db")
const { Team } = require("../db")
const { postTeams } = require('../controllers/05-getTeams')

module.exports = async (req, res) => {
  try {
    const {
      unformattedForename,
      unformattedSurname,
      description,
      image,
      nationality,
      dob,
      teamId,
    } = req.body

    if (
      !unformattedForename ||
      !unformattedSurname ||
      !description ||
      !image ||
      !nationality ||
      !dob ||
      !teamId
    ) return res.status(401).send("Faltan datos")

    const forename =
      unformattedForename.charAt(0).toUpperCase() +
      unformattedForename.slice(1).toLowerCase()

    const surname =
      unformattedSurname.charAt(0).toUpperCase() +
      unformattedSurname.slice(1).toLowerCase()

    

    const dbTeams = await Team.findAll()

    if (!dbTeams.length) await postTeams()

    const [newDriver, created] = await Driver.findOrCreate({ //TODO Esto me repite drivers, pero no sé si está mal, porque qué pasa si el user quiere agregar drivers repetidos
      where: {
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
      },
    })

    const teamToAssociate = await Team.findByPk(teamId)

    if (!teamToAssociate) {
      return res.status(404).json({ error: "Equipo no encontrado" })
    }

    await newDriver.addTeam(teamToAssociate) // Si decido hacer que esté relacionado con más de un team, debo poner adTeams

    res.status(200).json(newDriver)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
