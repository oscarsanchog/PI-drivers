const axios = require("axios")
const { Driver } = require("../db")
const URL_API = require("../utils/url")
const { Op } = require("sequelize")

module.exports = async (req, res) => {
  try {
    const query = req.query.name
    const name = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()

    // Database

    const dbDrivers = await Driver.findAll({
      where: {
        forename: {
          [Op.iLike]: `%${name}%`,
        },
      },
    })

    // API
    const { data: apiDrivers } = await axios.get(
      `${URL_API}?name.forename=${name}`
    )

    const driversFound = [...dbDrivers, ...apiDrivers].slice(0, 15)

    if (driversFound.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron conductores con ese nombre." })
    }

    res.status(200).json(driversFound)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
