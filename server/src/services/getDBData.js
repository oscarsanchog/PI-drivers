const { Driver, Team } = require("../db")
const { Op } = require("sequelize")

const fetchDBDrivers = async () => {
  return await Driver.findAll({
    include: {
      // Si requiro traer Drivers con más de 1 modelo, esto tiene que ser un array, y los modelos dentro en forma de obj
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
}

const fetchDBDriversById = async (id) => {
  return await Driver.findByPk(id, {
    include: {
      // join
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
}

const fetchDBDriverByName = async (name) => {
  return await Driver.findAll({
    where: {
      name: {
        forename: {
          [Op.iLike]: `%${name}%`,
        },
      },
    },
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
}

const fetchDBTeams = async () => await Team.findAll()

const createDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teamsId
) => {
  const [newDriver, created] = await Driver.findOrCreate({//Esto me repite drivers, pero no sé si está mal, porque qué pasa si el user quiere agregar drivers repetidos
    where: {
      name: { forename, surname },
      description,
      image,
      nationality,
      dob,
    },
  })
  await newDriver.addTeams(teamsId)
  return newDriver
}

const createTeams = async (team) => Team.findOrCreate({ where: { name: team } })

module.exports = {
  fetchDBDrivers,
  fetchDBDriversById,
  fetchDBDriverByName,
  fetchDBTeams,
  createDriver,
  createTeams,
}
