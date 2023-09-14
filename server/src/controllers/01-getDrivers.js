const axios = require("axios")
const { Driver, Team } = require("../db")
const URL_API = require("../utils/url")

module.exports = async () => {
  const dbDrivers = await Driver.findAll({
    include: {
      // Si requiro traer Drivers con más de 1 modelo, esto tiene que ser un array, y los modelos dentro en forma de obj
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })

  let { data: apiDrivers } = await axios(URL_API)

  apiDrivers.forEach((driver) => {
    if (driver.image.url === "") {
      driver.image.url =
        "https://raw.githubusercontent.com/oscarsanchog/PI-drivers/main/server/src/assets/img/profileImage.png"
    }
  })

  const allDrivers = [...dbDrivers, ...apiDrivers]
  return allDrivers
}
