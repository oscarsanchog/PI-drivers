const postDrivers = require('../controllers/04-postDrivers')

module.exports = async (req, res) => {
    try {
        const { name, description, image, nationality, dob, teamsId } = req.body
        const response = await postDrivers(name, description, image, nationality, dob, teamsId)
        res.status(201).json(response)

    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

/* module.exports = postDriversHandler */