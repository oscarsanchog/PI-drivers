const { Router } = require("express");
const router = Router();
const getDrivers = require('../controllers/01-getDrivers')

router.get('/', async (req, res) => {
    try {
        const response = await getDrivers()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;
