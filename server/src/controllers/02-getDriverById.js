const axios = require("axios")
const { Driver, Team } = require("../db")
const URL_API = require("../utils/url")

module.exports = async (req, res) => {
  try {
    const { id } = req.params
    const numberRegex = /^[0-9]+$/ // Verificador de números

    if (numberRegex.test(id)) { // Verifica que id sea número para hacer peticion api
      const apiDriversResponse = await axios(`${URL_API}/${id}`)

      if (apiDriversResponse.data.id) {
        const { id, name, description, image, nationality, dob, teams } = apiDriversResponse.data
        const apiDriver = { id, name, description, image, nationality, dob, teams }

        return res.status(200).json(apiDriver)
      }
    }

    const dbDriver = await Driver.findByPk(id, {
      include: { // join
        model: Team,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })


    if (dbDriver) {
        res.status(200).json(dbDriver)
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}