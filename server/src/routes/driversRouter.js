const { Router } = require("express")
const driversRouter = Router()
const postDriversHandler = require("../handlers/04-postDriversHandler")
const getDriversHandler = require("../handlers/01-getDriversHandler")
const getDriverByIdHandler = require('../handlers/02-getDriverByIdHandler')
const getDriverByNameHandler = require('../handlers/03-getDriverByNameHandler')

driversRouter
  .get("/name", getDriverByNameHandler)
  .get("/:id", getDriverByIdHandler)
  .get("/", getDriversHandler)
  .post("/", postDriversHandler)

/* router.get('/name', getDriversByName)

router.get('/teams', getTeams)

router.get("/", getDrivers)

router.get("/:id", getDriverById)

router.post('/', postDrivers) */

module.exports = driversRouter
