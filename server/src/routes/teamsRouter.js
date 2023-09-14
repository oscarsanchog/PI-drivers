const { Router } = require('express')
const teamsRouter = Router()
const getTeamsHandler = require('../handlers/05-getTeamsHandler')

teamsRouter.get('/', getTeamsHandler)

/* router.get('/name', getDriversByName)

router.get('/teams', getTeams)

router.get("/", getDrivers)

router.get("/:id", getDriverById)

router.post('/', postDrivers) */

module.exports = teamsRouter