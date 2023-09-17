import {
  GET_DRIVERS,
  GET_DETAIL,
  CLEAN_DETAIL,
  GET_DRIVERS_BY_NAME,
  GET_DRIVER_BY_ID,
  CLEAN_DRIVERS_FILTERED,
  ORDER_BY_NAME,
  ORDER_BY_DOB,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEAM,
  GET_TEAMS,
  POST_DRIVER,
  ERROR,
  CLEAN_ERROR
} from "./action-types"

const initialState = {
  drivers: [],
  driverDetail: {},
  driversFiltered: [],
  teams: [],
  error: ''
}

const reducer = (state = initialState, { type, payload }) => {
  // const removeFav = state.allFavsCharacters.filter((fav) => fav.id != payload)
  console.log('reducer', type);
  switch (type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: payload,
      }

    case GET_DETAIL:
      return {
        ...state,
        driverDetail: payload,
      }

    case CLEAN_DETAIL:
      return {
        ...state,
        driverDetail: {},
      }

    case GET_DRIVERS_BY_NAME:
      
      return {
        ...state,
        driversFiltered: payload,
      }
      
    case GET_DRIVER_BY_ID:
      return {
        ...state,
        driversFiltered: [payload, ...state.driversFiltered],
      }
    
    case CLEAN_DRIVERS_FILTERED:
      return {
        ...state,
        driversFiltered: []
      }

    case ORDER_BY_NAME:
      state.driversFiltered.length === 0
      ? state.driversFiltered = [...state.drivers]
      : state.driversFiltered = [...state.driversFiltered]

      return {
        ...state,
        driversFiltered:
          payload === 'A'
            ? state.driversFiltered.sort((a, b) => a.name.forename.localeCompare(b.name.forename))
            : state.driversFiltered.sort((a, b) => b.name.forename.localeCompare(a.name.forename))
      }

    case ORDER_BY_DOB:
      state.driversFiltered.length === 0
      ? state.driversFiltered = [...state.drivers]
      : state.driversFiltered = [...state.driversFiltered]
      

      return {
        ...state,
        driversFiltered:
          payload === 'A'
          ? state.driversFiltered.sort((a, b) => a.dob.localeCompare(b.dob))
          : state.driversFiltered.sort((a, b) => b.dob.localeCompare(a.dob))
      }


    case FILTER_BY_ORIGIN: 
    /* state.driversFiltered.length === 0
      ? state.driversFiltered = [...state.drivers]
      : state.driversFiltered = [...state.driversFiltered] */
    state.driversFiltered = [...state.drivers]
    
      return {
        ...state,
        driversFiltered:
          payload === 'db'
          ? state.driversFiltered.filter(driver => isNaN(driver.id))
          : state.driversFiltered.filter(driver => !isNaN(driver.id))
      }

    case FILTER_BY_TEAM:
      state.driversFiltered = [...state.drivers]

      const filterTeamsFunction = state.driversFiltered.filter(driver => {
        if(typeof driver.teams === 'string') {
          if(driver.teams.includes(payload)) return driver.teams

        } else if (Array.isArray(driver.teams)) {
          return driver.teams.some(team => team.name === payload)
        }
      })

      return {
        ...state,
        driversFiltered: filterTeamsFunction
      }

    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
      }

    case POST_DRIVER:
      return {
        ...state,
        driverDetail: payload
      }

    case ERROR:
      return {
        ...state,
        error: payload
      }
    
    case CLEAN_ERROR:
      return {
        ...state,
        error: ''
      }

    default:
      return { ...state }
  }
}

export default reducer
