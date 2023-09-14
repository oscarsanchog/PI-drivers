const getDriverById = require("../controllers/02-getDriverById")

module.exports = async (req, res) => {
  try {
    const { id } = req.params
    const response = await getDriverById(id)
    res.status(200).json(response)
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
