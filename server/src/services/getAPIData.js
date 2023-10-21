const URL_API = require("../utils/url")
const axios = require("axios")

const fetchAPIDrivers = async () => {
  const { data } = await axios(URL_API)
  return data
}

const fetchAPIDriversByID = async (id) => {
  const { data } = await axios(`${URL_API}/${id}`)
  return data
}
const fetchAPIDriversByName = async (name) => {
  const { data } = await axios.get(
    `${URL_API}?name.forename=${name}`
  )
  return data
}



module.exports = {
  fetchAPIDrivers,
  fetchAPIDriversByID,
  fetchAPIDriversByName
}
