const axios = require("axios")
const { Driver } = require("../db")
const URL_API = require("../utils/url")

module.exports = async (req, res) => {
  try {
    const { id } = req.params
    const numberRegex = /^[0-9]+$/

    if (numberRegex.test(id)) {
      const apiDriversResponse = await axios(`${URL_API}/${id}`)

      if (apiDriversResponse.data.id) {
        const { id, name, description, image, nationality, dob, teams } = apiDriversResponse.data
        const apiDriver = { id, name, description, image, nationality, dob, teams }

        return res.status(200).json(apiDriver)
      }
    }

    const dbDriver = await Driver.findByPk(id)
    if (dbDriver) {
        res.status(200).json(dbDriver)
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}