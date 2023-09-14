const axios = require("axios")
const { Driver, Team } = require("../db")
const URL_API = require("../utils/url")
const { Op } = require("sequelize")

// TODO
// El buscador de nombres de la API no funciona muy bien, puesto que si el driver tiene 2 nombres, tengo que buscar
// exactamente ambos nombres. También si tiene acentos, el user tiene que buscar exactamente los nombres con acentos.
// Es mejor extraer los nombres de la API al hacer la búsqueda y luego buscar el en el array que salga los nombres. Esto permitirá
// usar el includes para buscar drivers con dos nombres o más, y también el bucsar nombres sin necesidad de ponerle acento en la
// búsqueda.
module.exports = async (query) => {
/*     const query = req.query.name
 */    const name = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()

    // Database

    const dbDrivers = await Driver.findAll({
      where: {
        name: {
          forename: {
            [Op.iLike]: `%${name}%`,
          },
        },
      },
      include: {
        model: Team,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
    })

    // API
    const { data: apiDrivers } = await axios.get(
      `${URL_API}?name.forename=${name}`
    )

    const driversFound = [...dbDrivers, ...apiDrivers].slice(0, 15)

    if (driversFound.length === 0) {
      throw Error("No drivers with that name were found.")
    }

    return driversFound

}
