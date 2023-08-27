const axios = require("axios");
const { Driver } = require('../db')
const URL_API = require('../utils/url')

//TODO Si no tiene imagen, colocarle una por defecto
// Creo que aquí tendré que solicitarle a la BD también
module.exports = async () => {
    let allDrivers = []
    
    const DBDrivers = await Driver.findAll()
    DBDrivers.length && DBDrivers.forEach(driver => allDrivers.push(driver))

    const APIDrivers = await axios(URL_API)
    APIDrivers.data.forEach(driver => allDrivers.push(driver))


    return allDrivers
}