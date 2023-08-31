const { Driver } = require("../db")
const { Team } = require("../db")
const { postTeams } = require("../controllers/05-getTeams")

module.exports = async (req, res) => {
  try {
    let {
      unformattedForename,
      unformattedSurname,
      description,
      image,
      nationality,
      dob,
      teamsId,
    } = req.body

    if (
      !unformattedForename ||
      !unformattedSurname ||
      !description ||
      !nationality ||
      !dob ||
      !teamsId
    )
      return res.status(401).send("Faltan datos")

    const forename =
      unformattedForename.charAt(0).toUpperCase() +
      unformattedForename.slice(1).toLowerCase()

    const surname =
      unformattedSurname.charAt(0).toUpperCase() +
      unformattedSurname.slice(1).toLowerCase()

    const dbTeams = await Team.findAll()

    if (!dbTeams.length) await postTeams()

    if (image === null) image = 'https://labs.openai.com/s/CvuafvnpdYEkuUlELwpG7QpV'

    const [newDriver, created] = await Driver.findOrCreate({
      //Esto me repite drivers, pero no sé si está mal, porque qué pasa si el user quiere agregar drivers repetidos
      where: {
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
      },
    })

    /* const teamToAssociate = await Team.findByPk(teamsId)

    if (!teamToAssociate)
      return res.status(404).json({ error: "Equipo no encontrado" }) */

    //TODO podría refactorizar para que se pueda relacionar a más de un team
    
    await teamsId.forEach(teamId => newDriver.addTeam(teamId))
    
    //await newDriver.addTeams(teamsId) // Si decido hacer que esté relacionado con más de un team, debo poner adTeams

    res.status(200).json(newDriver)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
