import { } from "./action-types"
  
  const initialState = {
    
  }
  
  const reducer = (state = initialState, { type, payload }) => {
    // const removeFav = state.allFavsCharacters.filter((fav) => fav.id != payload)
  
    switch (type) {
  
      default:
        return { ...state }
    }
  }
  
  export default reducer