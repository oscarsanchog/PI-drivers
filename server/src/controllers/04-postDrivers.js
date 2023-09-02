const { Driver } = require("../db")
const { Team } = require("../db")
const { postTeams } = require("../controllers/05-getTeams")

module.exports = async (req, res) => {
  try {
    let {
      name,
      description,
      image,
      nationality,
      dob,
      teamsId,
    } = req.body

    if (
      !name.plainForename ||
      !name.plainSurname ||
      !description ||
      !nationality ||
      !dob ||
      !teamsId
    )
      return res.status(401).send("Faltan datos")

    const forename =
      name.plainForename.charAt(0).toUpperCase() +
      name.plainForename.slice(1).toLowerCase()

    const surname =
      name.plainSurname.charAt(0).toUpperCase() +
      name.plainSurname.slice(1).toLowerCase()

    const dbTeams = await Team.findAll()

    if (!dbTeams.length) await postTeams()

    if (image.url === null)
      image.url =
        "https://raw.githubusercontent.com/oscarsanchog/PI-drivers/main/server/src/assets/img/profileImage.png"

    const [newDriver, created] = await Driver.findOrCreate({
      //Esto me repite drivers, pero no sé si está mal, porque qué pasa si el user quiere agregar drivers repetidos
      where: {
        name:{forename, surname},
        description,
        image,
        nationality,
        dob,
      }
    })

    /* const teamToAssociate = await Team.findByPk(teamsId)

    if (!teamToAssociate)
      return res.status(404).json({ error: "Equipo no encontrado" }) */

    await newDriver.addTeams(teamsId) // Si decido hacer que esté relacionado con más de un team, debo poner adTeams

    res.status(200).json(newDriver)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
