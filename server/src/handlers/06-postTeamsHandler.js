const postTeams = require('../handlers/05-getTeamsHandler')

module.exports = async (req, res) => {
    try {
        const response = await postTeams()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}