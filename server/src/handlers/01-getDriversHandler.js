const getDrivers = require('../controllers/01-getDrivers')

module.exports = async (req, res) => {
    try {
        const response = await getDrivers()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

