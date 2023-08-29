const axios = require("axios")
const { Driver } = require("../db")
const URL_API = require("../utils/url")
const { Sequelize } = require("sequelize")
const { Op } = require("sequelize");


//TODO #4 Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.

module.exports = async (req, res) => {
  try {
    const query = req.query.name
    const name = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase() 

    // Database
    
        const dbDrivers = await Driver.findAll({
            where: {
                forename: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

    // API
    const { data: apiDrivers } = await axios.get(
      `${URL_API}?name.forename=${name}`
    )

    const allDrivers = [...dbDrivers, ...apiDrivers]
    //TODO Aquí tendría que poner el límite de 15 resultados por búsqueda.

    if (allDrivers.length === 0) {
      return res.status(404).json({ message: "No se encontraron conductores con ese nombre." })
    }

    res.status(200).json(allDrivers)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
