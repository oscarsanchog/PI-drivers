const { Router } = require("express")
const router = Router()
const getDrivers = require("../controllers/01-getDrivers")
const getDriverById = require("../controllers/02-getDriverById")
const getDriversByName = require('../controllers/03-getDriversByName')
const postDrivers = require('../controllers/04-postDrivers')

router.get('/name', getDriversByName)

router.get("/", getDrivers)
/* async (req, res) => {
 
  try {
    const response = await getDrivers()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}) */

router.get("/:id", getDriverById)

router.post('/', postDrivers)


module.exports = router
