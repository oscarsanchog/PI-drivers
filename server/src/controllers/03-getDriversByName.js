const axios = require("axios")
const { Driver } = require("../db")
const URL_API = require("../utils/url")
const { Sequelize } = require("sequelize")

module.exports = async (req, res) => {
  try {
    const query = req.query.name
    const name = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()

    // Database
    /*
        const dbDrivers = await Driver.findAll({
            where: {
                name: {
                    [Sequelize.prototype.iLike]: `%${searchQuery}%`
                }
            },
            limit: 15
        }) */

    // API
    const { data: apiDrivers } = await axios.get(
      `${URL_API}?name.forename=${name}`
    )

    const allDrivers = [...apiDrivers]

    if (allDrivers.length === 0) {
      return res.status(404).json({ message: "No se encontraron conductores." })
    }

    return res.json(allDrivers)
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor." })
  }
}
