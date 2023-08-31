const axios = require("axios")
const { Driver } = require("../db")
const URL_API = require("../utils/url")

module.exports = async (req, res) => {
  try {
    const dbDrivers = await Driver.findAll()

    const { data: apiDrivers } = await axios(URL_API)

    const allDrivers = [...dbDrivers, ...apiDrivers ]

    res.status(200).json(allDrivers)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
