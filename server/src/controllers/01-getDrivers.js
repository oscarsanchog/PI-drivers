const { fetchDBDrivers } = require('../services/getDBData')
const { fetchAPIDrivers } = require('../services/getAPIData')

module.exports = async () => {
  const dbDrivers = await fetchDBDrivers()
  let apiDrivers = await fetchAPIDrivers()

  apiDrivers.forEach((driver) => {
    if (driver.image.url === "") {
      driver.image.url =
        "https://raw.githubusercontent.com/oscarsanchog/PI-drivers/main/server/src/assets/img/profileImage.png"
    }
  })

  const allDrivers = [...dbDrivers, ...apiDrivers]
  return allDrivers
}
