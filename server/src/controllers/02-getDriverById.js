const { fetchAPIDriversByID } = require('../services/getAPIData')
const { fetchDBDriversById } = require('../services/getDBData')

module.exports = async (id) => {
  if (!isNaN(id)) { // Verifica que id sea número para hacer peticion api
    const apiDriversResponse = await fetchAPIDriversByID(id)

    if (apiDriversResponse.id) {
      let { id, name, description, image, nationality, dob, teams } =
        apiDriversResponse
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

  const dbDriver = await fetchDBDriversById(id)

  if (dbDriver) return dbDriver

  throw Error("Driver not found")
}
