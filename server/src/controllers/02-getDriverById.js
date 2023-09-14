const axios = require("axios")
const { Driver, Team } = require("../db")
const URL_API = require("../utils/url")

module.exports = async (id) => {
  /*   const { id } = req.params
   */ const numberRegex = /^[0-9]+$/ // Verificador de números

  /* if (numberRegex.test(id)) { */
  if (!isNaN(id)) { // Verifica que id sea número para hacer peticion api
    const apiDriversResponse = await axios(`${URL_API}/${id}`)

    if (apiDriversResponse.data.id) {
      let { id, name, description, image, nationality, dob, teams } =
        apiDriversResponse.data
      if (image.url === "")
        image.url =
          "https://raw.githubusercontent.com/oscarsanchog/PI-drivers/main/server/src/assets/img/profileImage.png"

      const apiDriver = {
        id,
        name,
        description,
        image,
        nationality,
        dob,
        teams,
      }

      return apiDriver
    }
  }

  const dbDriver = await Driver.findByPk(id, {
    include: {// join
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })

  if (dbDriver) return dbDriver

  throw Error("Driver not found")
}
