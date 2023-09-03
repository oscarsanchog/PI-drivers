import {
  GET_DRIVERS,
  GET_DETAIL,
  CLEAN_DETAIL,
  GET_DRIVERS_BY_NAME,
  GET_DRIVER_BY_ID,
  CLEAN_DRIVERS
} from "./action-types"

const initialState = {
  drivers: [],
  driverDetail: {},
}


const reducer = (state = initialState, { type, payload }) => {
  // const removeFav = state.allFavsCharacters.filter((fav) => fav.id != payload)

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
        drivers: payload,
      }
      
      
    case GET_DRIVER_BY_ID:
      return {
        ...state,
        drivers: [payload, ...state.drivers],
        
      }
    
    case CLEAN_DRIVERS:
      return {
        ...state,
        drivers: []
      }

    default:
      return { ...state }
  }
}

export default reducer
