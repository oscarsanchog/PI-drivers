const axios = require("axios");
const URL = require('../utils/url')

module.exports = async () => {
    const response = await axios(URL)
    return response.data
}