const getDriverByName = require("../controllers/03-getDriversByName")

module.exports = async (req, res) => {
  try {
    const query = req.query.name
    const response = await getDriverByName(query)
    res.status(200).json(response)
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
