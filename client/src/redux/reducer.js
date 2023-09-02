import { GET_DRIVERS } from "./action-types"
  
  const initialState = {
    drivers: []
  }
  
  const reducer = (state = initialState, { type, payload }) => {
    // const removeFav = state.allFavsCharacters.filter((fav) => fav.id != payload)
  
    switch (type) {
      case GET_DRIVERS:
        return {
          ...state,
          drivers: payload
        }
  
      default:
        return { ...state }
    }
  }
  
  export default reducer