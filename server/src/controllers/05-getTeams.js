const postTeams = require('./06-postTeams')
const { fetchDBTeams } = require('../services/getDBData')

module.exports = async () => {
    const dbTeams = await fetchDBTeams()

    if (!dbTeams.length) {// si la petición de arriba me arrojó un array vacío es porque no hay teams y los crea desde la api
      await postTeams()
      const createdTeams = await fetchDBTeams()
      return createdTeams
    }

    return dbTeams
}


