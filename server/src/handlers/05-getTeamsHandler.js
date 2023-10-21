const getTeams = require('../controllers/05-getTeams')

module.exports = async (req, res) => {
    try {
        const response = await getTeams()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}